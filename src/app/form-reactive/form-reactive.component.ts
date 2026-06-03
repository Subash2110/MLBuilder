import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-reactive',
    templateUrl: './form-reactive.component.html',
    styleUrls: ['./form-reactive.component.css'],
    standalone: false
})
export class FormReactiveComponent implements OnInit{

  public causeCode: any[] = [
    // { key: null, itemName: 'Select', Box: [] },
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
    // { key: null, itemName: 'Select' },
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
  // public reasonArray: any[] = [{ key: null, itemName: 'Select' }];/
  public ReasonListPC109: any[] = [
    // { key: null, itemName: 'Select' },
    { key: 211, itemName: '211 - Daily Guarantee(Loads)' },
    { key: 299, itemName: '299 - Others(Explain in Reason for Request)' }
  ];
  public ReasonListPC111: any[] = [
    // { key: null, itemName: 'Select' },
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
    // { key: null, itemName: 'Select' },
    { key: 282, itemName: '282 - Smith System/Safe Drvg' },
    { key: 283, itemName: '283 - Safety/Wellness/Inj Prev' },
    { key: 284, itemName: '284 - Pre-Trip Insp Trng.(Equip)' },
    { key: 285, itemName: '285 - Pre-Load Insp Trng.(Cargo)' },
    { key: 286, itemName: '286 - DOT/CSA Trng(Explain)' },
    { key: 288, itemName: '288 - Equip-Train/Re-Train' }
  ];
  public statusArray: any[] = [
    // { key: null, itemName: 'Select' },
    { key: 301, itemName: '301 - Loaded' },
    { key: 302, itemName: '302 - Empty' }
  ];
  public whenArray: any[] = [
    // { key: null, itemName: 'Select' },
    { key: 401, itemName: '401 - Loading' },
    { key: 402, itemName: '402 - UnLoading' },
    { key: 403, itemName: '403 - Pre-Trip' },
    { key: 404, itemName: '404 - Driving' }
  ];
  public equipmentArray: any[] = [
    // { key: null, itemName: 'Select' },
    { key: 501, itemName: '501 - Tractor' },
    { key: 502, itemName: '502 - Trailer' }
  ];
  public repairArray: any[] = [
    // { key: null, itemName: 'Select' },
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

  formData! : FormGroup;
  selectedCauseCode: number | null = null;
  addedDateFields: any;
  disableAll = [102, 103, 104, 106, 107, 109, 110, 111, 112, 113, 115];
  disableUnit = [101, 102, 103, 104, 106, 107, 109, 110, 111, 112, 113, 115, 140];
  defaultTimeCodes = [102, 104, 105, 106, 109, 110, 112, 115, 119, 130];
  visibleFields: string[] = [];
  @ViewChild('myForm') myForm: NgForm | undefined;

  constructor() {
    this.formData = new FormGroup({
      empNumber: new FormControl(null),
      empName: new FormControl(null),
      terminal: new FormControl(null),
      selectedCauseCode: new FormControl(null),
      location: new FormControl(null),
      reason109: new FormControl(null),
      reason111: new FormControl(null),
      reason115: new FormControl(null),
      status: new FormControl(null),
      when: new FormControl(null),
      equipment: new FormControl(null),
      repair: new FormControl(null),
      dateFields: new FormArray([this.createDateTimeField()]),
      truck : new FormControl ({ value: null, disabled: true }),
      trailer : new FormControl ( { value: null, disabled: true }),
      load : new FormControl ( { value: null, disabled: true }),
      units : new FormControl ( { value: null, disabled: true }),
      terminalNotify: new FormControl(false),
      email: new FormControl({ value: null, disabled: true }, [Validators.email])
    });

    this.formData.get('terminalNotify')?.valueChanges.subscribe(val => {
      const emailControl = this.formData.get('email');
      if (val) {
        emailControl?.enable();
      } else {
        emailControl?.disable();
        emailControl?.reset();
      }
    });
  }

  ngOnInit() {
    this.formData.get('selectedCauseCode')?.valueChanges.subscribe((causeCode: number) => {
    this.onDetails(causeCode);
    });
    
  }

  showField: { [key: string]: string[] } = {
    A: ['location'],
    B: [],
    C: ['status'],
    D: ['when'],
    E: ['repair'],
    F: ['equipment']
  };

  onCauseCode(code: number): void {
    const selected = this.causeCode.find(c => c.key === code);

    this.visibleFields = selected?.Box.filter((b:string)=> b !== 'B').flatMap((b:string) => this.showField[b] || []) || [];

    if (selected?.Box.includes ('B')){
      if ( code === 109) this.visibleFields.push('reason109');
      else if ( code === 111) this.visibleFields.push('reason111');
      else if ( code === 115) this.visibleFields.push('reason115');
    }

    const allFieldNames = ['location', 'reason109', 'reason111', 'reason115', 'status', 'when', 'equipment', 'repair'];

    allFieldNames.forEach(fieldName => {
      const control = this.formData.get(fieldName);
      if (this.visibleFields.includes(fieldName)) {
        control?.setValidators([Validators.required]);
        control?.enable();
      } else {
        control?.clearValidators();
        control?.reset();
        control?.disable();
      }
      control?.updateValueAndValidity();
    });

    const isDefault = this.defaultTimeCodes.includes(code);
    this.dateFields.controls.forEach(group => {
      group.patchValue({
        startTime: isDefault ? '12:00 AM' : '',
        endTime: isDefault ? '11:59 PM' : ''
      });
    });
  }

  get dateFields(): FormArray {
    return this.formData.get('dateFields') as FormArray;
  }

  onDetails(causeCode: number): void {
    const controls = [
      { key: 'truck', enable: !this.disableAll.includes(causeCode), validators: [Validators.required, Validators.pattern('^[0-9]{4,5}$')] },
      { key: 'trailer', enable: !this.disableAll.includes(causeCode), validators: [Validators.required, Validators.pattern('^[0-9]{4,8}$')] },
      { key: 'load', enable: !this.disableAll.includes(causeCode), validators: [Validators.required,Validators.pattern('^[0-9]{8,8}$')] },
      { key: 'units', enable: !this.disableUnit.includes(causeCode), validators: [Validators.required,Validators.pattern('^[0-9]{1,13}$')] }
    ];

    controls.forEach(({ key, enable, validators }) => {
      const control = this.formData.get(key);
      if (control) {
        if (enable) {
          control.enable();
          control.setValidators(validators);
        } else {
          control.disable();
          control.clearValidators();
        }
        control.updateValueAndValidity();
      }
    });
  }
  
  createDateTimeField(): FormGroup {
    return new FormGroup({
      date: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required)
    });
  }

  addDateTimeField(): void {
    this.dateFields.push(this.createDateTimeField());
  }

  deleteDateTimeField(index: number): void {
    this.dateFields.removeAt(index);
  }
  
  shouldShowAddButton(): boolean {
    const cause = this.formData.get('selectedCauseCode')?.value;
    const reason = this.formData.get('reason111')?.value;
    const list = this.formData.get('dateFields') as FormArray;
    return cause === 111 && reason === 215 && list.length < 6;
  }

  isAddButtonEnabled(): boolean {
    if (!this.shouldShowAddButton()) return false;

    const fields = this.formData.get('dateFields') as FormArray;
    if (fields.length === 0) return false;

    const last = fields.at(fields.length - 1) as FormGroup;
    return last.valid;
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const raw = this.formData.getRawValue(); 

    const output = {
      EmployeeDetails: {
        EmpNumber: raw.empNumber,
        EmpName: raw.empName,
        TerminalId: raw.terminal
      },
      CauseCodeData: {
        SelectedCauseCode: raw.selectedCauseCode,
        Location: raw.location,
        Reason109: raw.reason109,
        Reason111: raw.reason111,
        Reason115: raw.reason115,
        Status: raw.status,
        When: raw.when,
        Equipment: raw.equipment,
        Repair: raw.repair
      },
      DateTime: raw.dateFields.map((field: any, index: number) => ({
        [`Date${index + 1}`]: this.formatDate(field.date),
        [`Start Time${index + 1}`]: field.startTime,
        [`End Time${index + 1}`]: field.endTime
      })),
      Details: {
        Truck: raw.truck,
        Trailer: raw.trailer,
        Load: raw.load,
        Units: raw.units
      },
      Contacts: {
        TerminalNotify: raw.terminalNotify,
        Email: raw.email
      }
    };
  
    console.log(JSON.stringify(output, null, 2));
    console.log(this.formData.value);      
    
    
    if(this.myForm){
      this.myForm.resetForm();
    }

    this.formData.get('truck')!.disable();
    this.formData.get('trailer')?.disable();
    this.formData.get('load')?.disable();
    this.formData.get('units')?.disable();
    this.formData.get('email')?.disable();
    
    } 
    
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }

  enableEmail(): void {
    this.formData.get('terminalNotify')?.valueChanges.subscribe(checked => {
      const emailControl = this.formData.get('email');
      if (checked) {
        emailControl?.enable();
      } else {
        emailControl?.disable();
      }
    });
  }

}
