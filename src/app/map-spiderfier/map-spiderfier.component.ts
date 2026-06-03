import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

declare var OverlappingMarkerSpiderfier: any;

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
  selector: 'app-map-spiderfier',
  templateUrl: './map-spiderfier.component.html',
  styleUrls: ['./map-spiderfier.component.css'],
  standalone: false
})
export class MapSpiderfierComponent implements OnInit {

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

  oms!: any;  // OMS instance

  constructor(private http: HttpClient, private router:Router) { }

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

    setTimeout(() => {
      this.applySpiderfier();
    }, 0);
  }

  openInfo(marker: MapMarker | undefined, index: number) {
    if (!marker) return;

    const mark = this.markers[index];
    this.selectedMarkerInfo = `
      <h3><strong>${mark.name} (${mark.customerCode})</strong></h3>
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

  applySpiderfier() {
    if (!this.map?.googleMap) return;

    // Initialize OMS
    this.oms = new OverlappingMarkerSpiderfier(this.map.googleMap, {
      markersWontMove: true,
      markersWontHide: true,
      basicFormatEvents: true
    });

    const nativeMarkers: google.maps.Marker[] = [];


    this.markerRefList.forEach((marker, index) => {
      const nativeMarker = marker.marker as google.maps.Marker;


      nativeMarker.addListener('click', () => {
        this.openInfo(marker, index);
      });

      // Add marker to OMS
      this.oms.addMarker(nativeMarker);
      nativeMarkers.push(nativeMarker);
    });

  }

  logout() {
    this.router.navigate(['/login'])
  }
}
