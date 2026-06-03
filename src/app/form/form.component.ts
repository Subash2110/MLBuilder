import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
    standalone: false
})
export class FormComponent{

  
  terminalData = [
    {
        "id": 73,
        "hash": "a",
        "name": "NIAGARA",
        "latitude": 43.127127,
        "longitude": -79.023911
    },
    {
        "id": 22,
        "hash": "a",
        "name": "CAMBRIDGE",
        "latitude": 43.4229,
        "longitude": -80.3675
    },
    {
        "id": 23,
        "hash": "a",
        "name": "WOODSTOCK",
        "latitude": 43.147,
        "longitude": -80.69
    },
    {
        "id": 26,
        "hash": "a",
        "name": "INGERSOLL",
        "latitude": 43.00875,
        "longitude": -80.8889
    },
    {
        "id": 27,
        "hash": "a",
        "name": "OSHAWA",
        "latitude": 43.8615,
        "longitude": -78.871
    },
    {
        "id": 76,
        "hash": "a",
        "name": "PHILADELPHIA",
        "latitude": 39.891663,
        "longitude": -75.157073
    },
    {
        "id": 42,
        "hash": "a",
        "name": "LOUISVILLE",
        "latitude": 38.1292904,
        "longitude": -85.7163953
    },
    {
        "id": 50,
        "hash": "a",
        "name": "DETROIT",
        "latitude": 42.416241,
        "longitude": -83.028191
    },
    {
        "id": 30,
        "hash": "a",
        "name": "AURORA",
        "latitude": 41.7664854,
        "longitude": -88.2382273
    },
    {
        "id": 20,
        "hash": "a",
        "name": "BELVIDERE",
        "latitude": 42.242087,
        "longitude": -88.877553
    },
    {
        "id": 45,
        "hash": "a",
        "name": "CHICAGO HEIGHTS",
        "latitude": 41.529201,
        "longitude": -87.613994
    },
    {
        "id": 48,
        "hash": "a",
        "name": "LAFAYETTE",
        "latitude": 40.384193,
        "longitude": -86.813723
    },
    {
        "id": 51,
        "hash": "a",
        "name": "WINDSOR",
        "latitude": 42.2929,
        "longitude": -82.9761
    },
    {
        "id": 55,
        "hash": "a",
        "name": "MARYSVILLE",
        "latitude": 40.27567,
        "longitude": -83.520419
    },
    {
        "id": 57,
        "hash": "a",
        "name": "STERLING HEIGHTS",
        "latitude": 42.5802615,
        "longitude": -83.0340067
    },
    {
        "id": 60,
        "hash": "a",
        "name": "TOLEDO",
        "latitude": 41.707039,
        "longitude": -83.530759
    },
    {
        "id": 95,
        "hash": "a",
        "name": "SMYRNA",
        "latitude": 35.9734979,
        "longitude": -86.4857684
    },
    {
        "id": 49,
        "hash": "a",
        "name": "PRINCETON",
        "latitude": 38.294181,
        "longitude": -87.5668541
    },
    {
        "id": 79,
        "hash": "a",
        "name": "NEWARK",
        "latitude": 40.71065,
        "longitude": -74.15603
    },
    {
        "id": 74,
        "hash": "a",
        "name": "ANNAPOLIS JCT",
        "latitude": 39.1299459,
        "longitude": -76.788112
    },
    {
        "id": 46,
        "hash": "a",
        "name": "HAMTRAMCK",
        "latitude": 42.3812561,
        "longitude": -83.0357098
    },
    {
        "id": 63,
        "hash": "a",
        "name": "BRAMPTON",
        "latitude": 43.7496,
        "longitude": -79.722
    },
    {
        "id": 64,
        "hash": "a",
        "name": "LONDON",
        "latitude": 42.92262,
        "longitude": -81.18181
    },
    {
        "id": 68,
        "hash": "a",
        "name": "LAKE ORION",
        "latitude": 42.7083201,
        "longitude": -83.2609763
    },
    {
        "id": 69,
        "hash": "a",
        "name": "WARREN VDC",
        "latitude": 41.142764,
        "longitude": -80.858386
    },
    {
        "id": 31,
        "hash": "a",
        "name": "HEGEWISCH",
        "latitude": 41.6491833,
        "longitude": -87.5592886
    },
    {
        "id": 67,
        "hash": "a",
        "name": "OAKVILLE",
        "latitude": 43.475821,
        "longitude": -79.66944
    },
    {
        "id": 70,
        "hash": "a",
        "name": "LORDSTOWN",
        "latitude": 41.176,
        "longitude": -80.8749
    },
    {
        "id": 47,
        "hash": "a",
        "name": "GEORGETOWN",
        "latitude": 38.271821,
        "longitude": -84.535628
    },
    {
        "id": 77,
        "hash": "a",
        "name": "PORT NEWARK",
        "latitude": 40.69328,
        "longitude": -74.12949
    },
    {
        "id": 40,
        "hash": "a",
        "name": "FORT WAYNE",
        "latitude": 40.9626922105,
        "longitude": -85.3118537895
    },
    {
        "id": 28,
        "hash": "a",
        "name": "ALLISTON",
        "latitude": 44.1529289163,
        "longitude": -79.8428499721
    },
    {
        "id": 41,
        "hash": "a",
        "name": "KENTUCKY TRUCK",
        "latitude": 38.3017636169,
        "longitude": -85.5365798996
    }
]



  public causeCode: any[] = [
    { key: null, itemName: 'Select', Box: [] },
    { key: 101, itemName: '101 - Breakdown', Box: ['A', 'C', 'D', 'E', 'F'] },
    { key: 102, itemName: '102 - Personal Holiday', Box: [] },
    { key: 103, itemName: '103 - Student Training', Box: ['A'] },
    { key: 104, itemName: '104 - Holiday', Box: [] },
    { key: 105, itemName: '105 - Reloads', Box: [] },
    { key: 106, itemName: '106 - Sick', Box: [] },
    { key: 107, itemName: '107 - Retraining 1/2 Rate', Box: [] },
    { key: 109, itemName: '109 - Misc', Box: ['A', 'B'] },
    { key: 110, itemName: '110 - Jury', Box: [] },
    { key: 111, itemName: '111 - Delay', Box: ['A', 'B'] },
    { key: 112, itemName: '112 - Funeral Pay', Box: [] },
    { key: 113, itemName: '113 - Trainer', Box: ['A'] },
    { key: 115, itemName: '115 - Training', Box: ['A', 'B'] },
    { key: 119, itemName: '119 - Border Crossing', Box: [] },
    { key: 130, itemName: '130 - Extra Skids', Box: [] },
    { key: 140, itemName: '140 - Holiday Worked Hours', Box: [] }
  ];
  public locationArray: any[] = [
    { key: null, itemName: 'Select' },
    { key: 1, itemName: '1 - On the Road' },
    { key: 2, itemName: '2 - Motel' },
    { key: 3, itemName: '3 - Dealer' },
    { key: 4, itemName: '4 - Other(Explain in Reason for Request)' },
    { key: 20, itemName: '20 - Belvidere' },
    { key: 30, itemName: '30 - Aurora' },
    { key: 31, itemName: '31 - Hegewisch' },
    { key: 42, itemName: '42 - Louisville' },
    { key: 47, itemName: '47 - Georgetown' },
    { key: 48, itemName: '48 - Lafayette' },
    { key: 49, itemName: '49 - Princeton' },
    { key: 50, itemName: '50 - Detroit' },
    { key: 55, itemName: '55 - Marysville' },
    { key: 60, itemName: '60 - Toledo' },
    { key: 69, itemName: '69 - Warren' },
    { key: 73, itemName: '73 - Niagara' },
    { key: 74, itemName: '74 - AJ/Jessup' },
    { key: 76, itemName: '76 - Philadelphia' },
    { key: 79, itemName: '79 - Newark' },
    { key: 95, itemName: '95 - Smyrna' },
  ];
  public reasonArray: any[] = [{ key: null, itemName: 'Select' }];
  public ReasonListPC109: any[] = [
    { key: null, itemName: 'Select' },
    { key: 211, itemName: '211 - Daily Guarantee(Loads)' },
    { key: 299, itemName: '299 - Others(Explain in Reason for Request)' }
  ];
  public ReasonListPC111: any[] = [
    { key: null, itemName: 'Select' },
    { key: 201, itemName: '201 - Weather' },
    { key: 202, itemName: '202 - Dispatch Delay' },
    { key: 203, itemName: '203 - Drug Test' },
    { key: 206, itemName: '206 - Re-arrange load' },
    { key: 207, itemName: '207 - Pick-up unit' },
    { key: 208, itemName: '208 - Yard work' },
    { key: 209, itemName: '209 - Load baying' },
    { key: 210, itemName: '210 - Lost unit' },
    { key: 212, itemName: '212 - Union Business' },
    { key: 213, itemName: '213 - Scale Delay' },
    { key: 214, itemName: '214 - Excess Loading' },
    { key: 215, itemName: '215 - Fueling' },
    { key: 216, itemName: '216 - Dealer Delay' },
    { key: 217, itemName: '217 - Shuttle' },
    { key: 218, itemName: '218 - Training Students' },
    { key: 219, itemName: '219 - Equip.Certification' },
    { key: 220, itemName: '220 - No Spare Truck' },
    { key: 221, itemName: '221 - Accident' },
    { key: 222, itemName: '222 - D.O.T.Inspection' },
    { key: 233, itemName: '233 - Train Delay' },
    { key: 234, itemName: '234 - Yard Delay' },
    { key: 239, itemName: '239 -  Truck Wash' },
    { key: 281, itemName: '281 - Move Equipment' },
    { key: 289, itemName: '289 - Test Load' },
    { key: 298, itemName: '298 - Plant/Yard Hold' },
    { key: 299, itemName: '299 - Others(Explain in Reason for Request)' }
  ];
  public ReasonListPC115: any[] = [
    { key: null, itemName: 'Select' },
    { key: 282, itemName: '282 - Smith System/Safe Drvg' },
    { key: 283, itemName: '283 - Safety/Wellness/Inj Prev' },
    { key: 284, itemName: '284 - Pre-Trip Insp Trng.(Equip)' },
    { key: 285, itemName: '285 - Pre-Load Insp Trng.(Cargo)' },
    { key: 286, itemName: '286 - DOT/CSA Trng(Explain)' },
    { key: 288, itemName: '288 - Equip-Train/Re-Train' }
  ];
  public statusArray: any[] = [
    { key: null, itemName: 'Select' },
    { key: 301, itemName: '301 - Loaded' },
    { key: 302, itemName: '302 - Empty' }
  ];
  public whenArray: any[] = [
    { key: null, itemName: 'Select' },
    { key: 401, itemName: '401 - Loading' },
    { key: 402, itemName: '402 - UnLoading' },
    { key: 403, itemName: '403 - Pre-Trip' },
    { key: 404, itemName: '404 - Driving' }
  ];
  public equipmentArray: any[] = [
    { key: null, itemName: 'Select' },
    { key: 501, itemName: '501 - Tractor' },
    { key: 502, itemName: '502 - Trailer' }
  ];
  public repairArray: any[] = [
    { key: null, itemName: 'Select' },
    { key: 601, itemName: '601 - A/C Heater' },
    { key: 613, itemName: '613 - Brakes' },
    { key: 617, itemName: '617 - Tires' },
    { key: 622, itemName: '622 - Drive Line' },
    { key: 631, itemName: '631 - Charging/Cranking' },
    { key: 634, itemName: '634 - Lighting/Electrical' },
    { key: 642, itemName: '642 - Cooling System' },
    { key: 644, itemName: '644 - Fuel System' },
    { key: 645, itemName: '645 - Engine' },
    { key: 655, itemName: '655 - Ramp/Decs' },
    { key: 665, itemName: '665 - Hydraulic' },
    { key: 677, itemName: '677 - Trailer Frame' },
    { key: 699, itemName: 'Other-Explain Below' }
  ];

 

  

  showField(field: string): boolean {
    const fieldMap: { [key: number]: string[] } = {
      101: ['location','status','when','equipment', 'repair',],
      102:[],
      103: ['location'],
      104:[],
      105:[],
      106:[],
      107:[],
      109: ['location', 'reason109'],
      110:[],
      111: ['location', 'reason111'],
      112:[],
      113:['location'],
      115: ['location', 'reason115'],
      119:[],
      130:[],
      140:[],
    };
  
    const fieldsToShow = fieldMap[this.selectedCauseCode!] || [];
    return fieldsToShow.includes(field);
  }
  
 


  constructor(private http: HttpClient) {}

 
  selectedCauseCode: number | null = null;
  selectedReason: number | null = null;

  //Chech Box
  isChecked = false;
  isDisabled: boolean = true;


  toggleInput(event: any) {
    this.isDisabled = !event.target.checked;
  }


  

  // Time 

  causeCodes = [101, 102, 103, 104, 105, 106, 107, 109, 110, 111, 112, 115, 119, 130];
  defaultTimeCodes = [102, 104, 105, 106, 109, 110, 112, 115, 119, 130];
  
  onCauseCodeChange(): void {
    if (this.defaultTimeCodes.includes(this.formData.selectedCauseCode!)) {
      this.addedDateFields = this.addedDateFields.map(field => ({
        ...field,
        startTime: '12:00 AM',
        endTime: '11:59 PM'
      }));
    } else {
      this.addedDateFields = this.addedDateFields.map(field => ({
        ...field,
        startTime: '',
        endTime: ''
      }));
    }
    
  }


  formData = {
    empNumber: null,
    empName: null,
    selectedCauseCode: null,
    location: null,
    reason: null,
    status: null,
    when: null,
    equipment: null,
    repair: null,
    truck: null,
    trailer: null,
    load: null,
    units: null,
    email: null,
    terminalId:null,
    reason109: null,
    reason111: null,
    reason115: null,
    startTime: '',
    endTime: '',
    terminal:'',
    mail:'',
  };


  

  addedDateFields: any[] = [{ date: '', startTime: '', endTime: '' }];
 
  //Details
  isUnitsRequired(): boolean {
    return [105, 119, 130].includes(this.selectedCauseCode!);
  }
  
  isRequired(): boolean {
    return [101, 105, 119, 130, 140].includes(this.selectedCauseCode!);
  }

  DisableField(field: string): boolean {
    const cause = this.formData.selectedCauseCode;
    if (field === 'causeCode') return false;
    if (!cause) return true;

    const disableTruckTrailerLoad = [102,103,104,106,107,109,110,111,112,113,115];
    const disableUnits = [101,102,103,104,106,107,109,110,111,112,113,115,140];

    const truckFields = ['truck', 'trailer', 'load'];
    const unitsFields = ['units'];

    if (disableTruckTrailerLoad.includes(cause) && truckFields.includes(field)) return true;
    if (disableUnits.includes(cause) && unitsFields.includes(field)) return true;

    return false;
  }
  
  //Casuse code 111 and Reason 215 picker
  shouldShowAddButton(): boolean {
    return this.selectedCauseCode === 111 &&
           this.selectedReason === 215 &&
           this.addedDateFields.length < 6;
  }

  isAddButtonEnabled(): boolean {
    if (this.addedDateFields.length === -1) return true;
    const last = this.addedDateFields[this.addedDateFields.length - 1];
    return !!(last.date && last.startTime && last.endTime);
  }

  addDateTimeField(): void {
    if (this.addedDateFields.length < 6) {
      this.addedDateFields.push({ date: '', startTime: '', endTime: '' });
    }
  }

  deleteDateTimeField(index: number): void {
    if (this.addedDateFields.length > 1) {
      this.addedDateFields.splice(index, 1);
    }
  }

  onReasonChange(): void {
    if (this.selectedCauseCode === 111 && this.selectedReason === 215) {
      if (this.addedDateFields.length === -1) {
        this.addDateTimeField();
      }
    } else {
      this.addedDateFields = [{ date: '', startTime: '', endTime: '' }]; // Clear if Reason is changed
    }
  }

onSubmit(myForm: any) {
  if (myForm.valid) {
    const formData = myForm.value;

    const formatDate = (inputDate: any): string => {
      if (!inputDate) return '';
      const date = new Date(inputDate);
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const dd = date.getDate().toString().padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${mm}-${dd}-${yyyy}`;
    };

    const dateTimeData = this.addedDateFields.map((field: any, index: number) => {
      return {
        [`date${index + 1}`]: formatDate(field.date),
        [`startTime${index + 1}`]: field.startTime || '' ,
        [`endTime${index + 1}`]: field.endTime || ''
      };
    });

   
    const outputData = {
      employeeDetails: {
        EmpNumber: formData.empNumber,
        EmpName: formData.empName,
        TerminalId: formData.terminalId
      },
      causeCodeData: {
        SelectedCauseCode: formData.selectedCauseCode,
        Location: formData.location || null,
        Reason109: formData.reason109 || null,
        Reason111: formData.reason111 || null,
        Reason115: formData.reason115 || null,
        Status: formData.status || null,
        When: formData.when || null,
        Equipment: formData.equipment || null,
        Repair: formData.repair || null
      },
      DateTime: dateTimeData, 
      
      Details: {
        Truck: formData.truck || null,
        Trailer: formData.trailer || null,
        Load: formData.load || null,
        Units: formData.units || null
      },
      Contacts: {
        Terminal:formData.terminal || null ,
        Mail: formData.mail || null
      }
    };

    console.log(JSON.stringify(outputData, null, 2));
    myForm.resetForm();
    console.log(formData)
    this.addedDateFields = [{ date: '', startTime: '', endTime: '' }];
  

    // Send the data to the backend (optional)
  //   this.http.post('https://jsonplaceholder.typicode.com/posts', formData).subscribe({
  //     next: () => {
  //       console.log('Form data sent:', outputData);
  //       myForm.resetForm();
  //     },
  //     error: (err) => {
  //       console.error('Error sending data', err);
  //     }
  //   });
  // } else {
  //   console.log('Form is not valid');
  }

}


}
