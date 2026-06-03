import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { forkJoin } from 'rxjs';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
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
  selector: 'app-map-clusterer',
  templateUrl: './map-clusterer.component.html',
  styleUrl: './map-clusterer.component.css',
  standalone: false
})
export class MapClustererComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren('markerRef') markerRefList!: QueryList<MapMarker>;
  @ViewChild(GoogleMap) map!: GoogleMap;

  terminals: Terminal[] = [];
  lots: Lot[] = [];
  units: Unit[] = [];
  customers: Customer[] = [];
  userName: string = '';

  selectedTerminalId: number | null = null;
  center: google.maps.LatLngLiteral = { lat: 39.8283, lng: -98.5795 };
  markers: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadAllData().subscribe((data: {
      terminals: Terminal[],
      lots: Lot[],
      units: Unit[],
      customers: Customer[]
    }) => {
      const { terminals, lots, units, customers } = data;
      this.terminals = terminals;
      this.lots = lots;
      this.units = units;
      this.customers = customers;

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
      this.center = {
        lat: first.latitude,
        lng: first.longitude
      };
    }

    this.markers = relatedCustomers.map(location => ({

      position: { lat: location.latitude, lng: location.longitude },
      name: location.name,
      customerCode: location.customerCode,
      address: location.address,
      city: location.city,
      state: location.state,
      zip: location.zip
    }));

    setTimeout(() => this.createMarkerCluster(), 0);
  }


  selectedMarkerInfo = '';

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

  display: any;

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }

  markerClusterer!: MarkerClusterer;

  createMarkerCluster() {
    if (!this.map?.googleMap) return;

    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }

    const nativeMarkers = this.markerRefList.map((marker, index) => {
      const nativeMarker = marker.marker as google.maps.Marker;

      return nativeMarker;
    });

    this.markerClusterer = new MarkerClusterer({
      map: this.map.googleMap,
      markers: nativeMarkers
    });
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
