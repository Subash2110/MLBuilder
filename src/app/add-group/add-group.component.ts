import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  standalone: false
})

export class AddGroupComponent implements OnInit {

  terminals: any[] = [];
  loadTypes: any[] = [];
  selectedTerminalId: number | null = null;
  selectedLoadTypeId: number | null = null;

  days: string[] = [];
  selectedDay: string = '';
  groupToEdit: any | null = null;
  isEditMode = false;
  userName: string = '';

  formRows: any[] = [
    {
      selectedLoadTypeId: null,
      noOfLoads: null,
      noOfDrivers: null,
      expectedDeliveryDate: null,
      notes: ''
    }
  ];

  constructor(
    private http: HttpClient,
    private groupService: GroupService,
    private router: Router
  ) {
    this.groupToEdit = this.router.getCurrentNavigation()?.extras?.state?.['groupToEdit'];
  }

  ngOnInit(): void {
    this.http.get<any>('assets/TerminalLoadType.txt').subscribe(data => {
      this.terminals = data.data;
      this.populateFormForEdit();
    });

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    for (let i = 0; i < 4; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      this.days.push(daysOfWeek[nextDay.getDay()]);
    }
    this.isEditMode = !!this.groupToEdit;

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userName = user.userName;
  }

  populateFormForEdit(): void {
    if (this.groupToEdit) {
      this.selectedTerminalId = this.groupToEdit.selectedTerminalId;
      this.selectedDay = this.groupToEdit.selectedDay;
      this.onTerminalChange();

      setTimeout(() => {
        this.formRows = this.groupToEdit.loads.map((load: any) => ({
          selectedLoadTypeId: load.selectedLoadTypeId,
          noOfLoads: load.noOfLoads,
          noOfDrivers: load.noOfDrivers,
          expectedDeliveryDate: load.expectedDeliveryDate ? new Date(load.expectedDeliveryDate) : null,
          notes: load.notes
        }));
      }, 0);
    }
  }

  onTerminalChange(): void {
    const terminal = this.terminals.find(t => t.terminal_id === this.selectedTerminalId);
    if (terminal) {
      this.loadTypes = terminal.load_types || [];
      this.selectedLoadTypeId = null;
    } else {
      this.loadTypes = [];
      this.selectedLoadTypeId = null;
    }
  }
  get showFormFields(): boolean {
    return this.selectedTerminalId !== null && this.selectedDay !== '';
  }

  onAddRow(): void {
    this.formRows.push({
      selectedLoadTypeId: null,
      noOfLoads: null,
      noOfDrivers: null,
      expectedDeliveryDate: null,
      notes: ''
    });
  }

  onDeleteRow(index: number): void {
    if (this.formRows.length === 1) return;
    this.formRows.splice(index, 1);
  }

  onAdd(): void {
    const enrichedData = this.formRows.map(row => ({
      ...row,
      selectedTerminalId: this.selectedTerminalId,
      selectedDay: this.selectedDay
    }));

    const existingData = this.groupService.getFormData() || [];
    const updatedData = existingData.map(group => {
      if (this.groupToEdit && group.groupId === this.groupToEdit.groupId) {
        return {
          ...group,
          selectedTerminalId: this.selectedTerminalId,
          selectedDay: this.selectedDay,
          loads: enrichedData
        };
      }
      return group;
    });

    if (!this.groupToEdit) {
      updatedData.push({
        groupId: existingData.length + 1,
        selectedTerminalId: this.selectedTerminalId,
        selectedDay: this.selectedDay,
        loads: enrichedData
      });
    }

    this.groupService.setFormData(updatedData);
    this.router.navigate(['/load']);
    this.groupToEdit = null;
  }

  isFormValid(): boolean {
    const lastRow = this.formRows[this.formRows.length - 1];
    return lastRow.selectedLoadTypeId != null &&
      (lastRow.noOfLoads != null || lastRow.noOfDrivers != null) &&
      lastRow.expectedDeliveryDate != null;
  }

  today = new Date();

  dateFilter = (d: Date | null): boolean => {
    const date = d ?? new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    maxDate.setHours(0, 0, 0, 0);

    return date >= today && date <= maxDate;
  }

  isLoadTypeSelected(loadType: string, currentIndex: number): boolean {
    return this.formRows.some((row, index) => index !== currentIndex && row.selectedLoadTypeId === loadType);
  }

  allLoadTypesSelected(): boolean {
    const selectedTypes = this.formRows
      .map(row => row.selectedLoadTypeId)
      .filter(id => id != null);

    const uniqueSelected = new Set(selectedTypes);
    return uniqueSelected.size >= this.loadTypes.length;
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
