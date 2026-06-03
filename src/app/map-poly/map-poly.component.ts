import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


interface Terminal {
  id: number;
}

interface Lot {
  id: number;
  terminalId: number;
  code: string;
}

interface Unit {
  lotId: number;
  customerId: number;
  id: number;
}

interface Customer {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  customerCode: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-map-poly',
  templateUrl: './map-poly.component.html',
  styleUrls: ['./map-poly.component.css'],
  standalone: false
})
export class MapPolyComponent implements OnInit {


  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren('markerRef') markerRefList!: QueryList<MapMarker>;

  terminals: Terminal[] = [];
  lots: Lot[] = [];
  units: Unit[] = [];
  customers: Customer[] = [];
  userName: string = '';

  selectedTerminalId: number | null = null;
  center: google.maps.LatLngLiteral = { lat: 39.8283, lng: -98.5795 };
  markers: any[] = [];


  selectedMarkerInfo = '';
  display: any;

  selectedPoints: google.maps.LatLngLiteral[] = [];
  showPolyline = false;
  showPolygon = false;


  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: 'indigo',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };

  polygonOptions: google.maps.PolygonOptions = {
    fillColor: '#00FF00',
    fillOpacity: 0.35,
    strokeColor: 'blue',
    strokeOpacity: 0.8,
    strokeWeight: 3
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadAllData().subscribe((data) => {
      this.terminals = data.terminals;
      this.lots = data.lots;
      this.units = data.units;
      this.customers = data.customers;
    });

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userName = user.userName;
  }

  loadAllData() {
    return forkJoin({
      terminals: this.http.get<Terminal[]>('/assets/terminalList.txt'),
      lots: this.http.get<Lot[]>('/assets/lotList.txt'),
      units: this.http.get<Unit[]>('/assets/unitList.txt'),
      customers: this.http.get<Customer[]>('/assets/jsonformatter.txt')
    });
  }

  onTerminalChange() {
    if (!this.selectedTerminalId) return;

    const relatedLotIds = this.lots
      .filter(lot => lot.terminalId === this.selectedTerminalId)
      .map(lot => lot.id);

    const relatedCustomerIds = this.units
      .filter(unit => relatedLotIds.includes(unit.lotId))
      .map(unit => unit.customerId);

    const relatedCustomers = this.customers
      .filter(customer => relatedCustomerIds.includes(customer.id));

    if (relatedCustomers.length) {
      const first = relatedCustomers[0];
      this.center = { lat: first.latitude, lng: first.longitude };
    }

    this.markers = relatedCustomers.map(cust => ({
      position: { lat: cust.latitude, lng: cust.longitude },
      name: cust.name,
      customerCode: cust.customerCode,
      address: cust.address,
      city: cust.city,
      state: cust.state,
      zip: cust.zip
    }));

    this.selectedPoints = [];
    this.showPolygon = false;
    this.showPolyline = false;
  }

  openInfo(marker: MapMarker | undefined, index: number) {
    if (!marker) return;

    const mark = this.markers[index];
    this.selectedMarkerInfo = `
      <h4><strong>${mark.name} (${mark.customerCode})</strong></h4>
      Address: ${mark.address}<br>
      City: ${mark.city}<br>
      State: ${mark.state}<br>
      Zip: ${mark.zip}
    `;
    this.infoWindow.open(marker);
  }

  closeInfoWindow() {
    this.infoWindow?.close();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }

  onMarkerDoubleClick(index: number) {

    const point = this.markers[index].position;

    //again click last 3rd marker
    if (this.selectedPoints.length === 3) {
      const lastPoint = this.selectedPoints[2];
      this.selectedPoints = [point];
      this.showPolyline = false;
      this.showPolygon = false;
      alert('New Start point selected');
      return;
    }

    //same marker click
    if (this.selectedPoints.find(p => p.lat === point.lat && p.lng === point.lng)) {
      this.selectedPoints = [];
      this.showPolyline = false;
      this.showPolygon = false;
      alert('Same point already selected');
      return;
    }

    this.selectedPoints.push(point);

    //forming polygon and 3 marker
    if (this.selectedPoints.length === 3) {
      this.showPolygon = true;
      this.showPolyline = false;
    }
    //forming polyline and 2nd marker
    else if (this.selectedPoints.length === 2) {
      this.showPolyline = true;
      this.showPolygon = false;
    }
    //starting 1st marker
    else {
      alert('Start point selected.');
    }
  }

  getPolylinePath() {
    return this.selectedPoints.length >= 2
      ? [this.selectedPoints[0], this.selectedPoints[1]]
      : [];
  }

  logout() {
    this.router.navigate(['/login'])
  }
}




