import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css'],
  standalone: false
})
export class LoadComponent implements OnInit {

  groupedData: any[] = [];
  expandedElement: any | null = null;
  userName: string = '';

  displayedGroupColumns: string[] = ['groupId', 'selectedTerminalId', 'selectedDay', 'action'];
  displayedLoadColumns: string[] = ['id', 'selectedLoadTypeId', 'noOfLoads', 'noOfDrivers', 'expectedDeliveryDate', 'notes', 'action'];

  constructor(private groupService: GroupService, private router: Router) { }

  ngOnInit(): void {
    const data = this.groupService.getFormData() || [];
    this.groupedData = data.map((group, index) => ({
      ...group,
      groupId: index + 1,
      loads: (group.loads || []).map((load: any, i: number) => ({
        ...load,
        id: i + 1
      }))
    }));

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userName = user.userName;
  }

  toggleRow(row: any): void {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  onEdit(row: any): void {
    this.router.navigate(['/addGroup'], {
      state: { groupToEdit: row }
    });
  }

  onDelete(groupId: number): void {
    this.groupedData = this.groupedData.filter(group => group.groupId !== groupId);
    this.groupService.setFormData(this.groupedData);

    this.groupedData = this.groupedData.map((group, index) => ({
      ...group,
      groupId: index + 1
    }));
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
