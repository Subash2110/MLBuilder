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
  vin: string;
  description: string;
  wheelBase: number;
  rowBay: number;
  arrivalDate?: string;
  classificationId: string;
  lotCode: string;
  classificationIds: number[];
  Class: string;
  availableOn: string;
  age: string;
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
  afterHour: string;
}

interface Classification {
  class: string;
  id: number;
}

@Component({
  selector: 'app-map-dealer-notice',
  templateUrl: './map-dealer-notice.component.html',
  styleUrl: './map-dealer-notice.component.css',
  standalone: false
})
export class MapDealerNoticeComponent implements OnInit {

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren('markerRef') markerRefList!: QueryList<MapMarker>;
  @ViewChildren('hoverInfoWindowRefs') hoverInfoWindowRefs!: QueryList<MapInfoWindow>;

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

  selectedCustomer: Customer | null = null;
  selectedMarkerIndex: number | null = null;
  hoveredMarkerIndex: number | null = null;
  clickedMarkerIndex: number | null = null;

  customerUnits: (Unit & { lotCode: string; })[] = [];
  classifications: Classification[] = [];


  hoverInfoWindows: { markerIndex: number; content: string }[] = [];
  hoveredMarkerIndices: number[] = [];


  showTable: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }


  displayedColumns: string[] = [
    'Class',
    'age',
    'customerCode',
    'city',
    'vin',
    'description',
    'lotCode',
    'rowBay',
    'wheelBase',
    'afterHour'
  ];

  ngOnInit() {
    this.loadAllData().subscribe((data) => {
      this.terminals = data.terminals;
      this.lots = data.lots;
      this.units = data.units;
      this.customers = data.customers;
      this.classifications = data.classifications;
    });

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userName = user.userName;
  }

  loadAllData() {
    return forkJoin({
      terminals: this.http.get<Terminal[]>('/assets/terminalList.txt'),
      lots: this.http.get<Lot[]>('/assets/lotList.txt'),
      units: this.http.get<Unit[]>('/assets/unitList.txt'),
      customers: this.http.get<Customer[]>('/assets/jsonformatter.txt'),
      classifications: this.http.get<Classification[]>('/assets/classificationList.txt'),
    });
  }

  onTerminalChange() {
    if (!this.selectedTerminalId) return;

    this.showTable = false;

    const relatedLotIds = this.lots
      .filter((lot) => lot.terminalId === this.selectedTerminalId)
      .map((lot) => lot.id);

    const relatedCustomerIds = this.units
      .filter((unit) => relatedLotIds.includes(unit.lotId))
      .map((unit) => unit.customerId);

    const relatedCustomers = this.customers.filter((customer) =>
      relatedCustomerIds.includes(customer.id)
    );

    if (relatedCustomers.length) {
      const first = relatedCustomers[0];
      this.center = { lat: first.latitude, lng: first.longitude };
    }

    this.markers = relatedCustomers.map((cust) => ({
      position: { lat: cust.latitude, lng: cust.longitude },
      name: cust.name,
      customerCode: cust.customerCode,
      address: cust.address,
      city: cust.city,
      state: cust.state,
      zip: cust.zip,
    }));


  }

  onMarkerClick(marker: MapMarker, index: number) {
    this.clickedMarkerIndex = index;
    this.selectedMarkerIndex = index;
    this.hoveredMarkerIndex = null;

    const selected = this.markers[index];
    this.selectedMarkerInfo = this.getMarkerInfoHtml(this.markers[index]);

    this.markers = this.markers.map((m, i) => {
      if (i === index) {
        return {
          ...m,
          iconUrl: {
            url: 'assets/map (1).png',
            scaledSize: new google.maps.Size(50, 42)
          }
        };
      } else {
        const { iconUrl, ...rest } = m;
        return rest;
      }
    });

    this.openCustomerDetails(index);
    this.infoWindow.open(marker);

    this.hoverInfoWindows = [];
    this.hoveredMarkerIndices = [];
    setTimeout(() => {
      const markerRef = this.markerRefList.toArray()[index];
      if (markerRef) {
        this.infoWindow.open(markerRef);
      }
    });
  }

  onMarkerHover(marker: MapMarker, index: number) {
    if (index === this.clickedMarkerIndex) return;
    if (this.hoveredMarkerIndices.includes(index)) return;
    this.hoveredMarkerIndices.push(index);
    this.hoverInfoWindows.push({
      markerIndex: index,
      content: this.getMarkerInfoHtml(this.markers[index])
    });

    setTimeout(() => {
      const hoverWindows = this.hoverInfoWindowRefs.toArray();
      const lastHoverWindow = hoverWindows[hoverWindows.length - 1];
      if (lastHoverWindow) {
        lastHoverWindow.open(marker);
      }
    });
  }

  onMarkerHoverOut(index: number) {
    const hoverIdx = this.hoveredMarkerIndices.indexOf(index);
    if (hoverIdx > -1) {
      this.hoveredMarkerIndices.splice(hoverIdx, 1);
      this.hoverInfoWindows.splice(hoverIdx, 1);
    }
  }

  getMarkerInfoHtml(marker: any): string {
    return `
      <h4><strong>${marker.name} (${marker.customerCode})</strong></h4>
      Address: ${marker.address}<br>
      City: ${marker.city}<br>
      State: ${marker.state}<br>
      Zip: ${marker.zip}
    `;
  }

  openInfo(marker: MapMarker | undefined, index: number) {
    if (!marker) return;

    this.hoveredMarkerIndex = index;

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
    if (this.hoveredMarkerIndex !== null && this.hoveredMarkerIndex !== this.clickedMarkerIndex) {
      this.infoWindow?.close();
    }
    this.hoveredMarkerIndex = null;
  }

  openCustomerDetails(index: number): void {
    const markerData = this.markers[index];
    const customer = this.customers.find(c => c.customerCode === markerData.customerCode);

    if (!customer) {
      this.selectedCustomer = null;
      this.customerUnits = [];
      this.showTable = false;
      return;
    }


    this.selectedCustomer = customer;
    this.customerUnits = this.units
      .filter(u => u.customerId === customer.id)
      .map(unit => {
        const Class = unit.classificationIds
          .map(cid => this.classifications.find(cls => cls.id === cid)?.class)
          .filter(cls => !!cls)
          .join(', ') || 'N/A';

        const lotCode = this.lots.find(lot => lot.id === unit.lotId)?.code || 'N/A';

        const age = this.calculateAge(unit.availableOn?.toString());

        return {
          ...unit,
          lotCode,
          Class,
          age
        };
      });

    this.showTable = true;

  }

  calculateAge(dateStr?: string): string {
    if (!dateStr) return 'N/A';

    const arrival = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - arrival.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays.toString();
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
