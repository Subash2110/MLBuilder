import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-new',
    templateUrl: './dashboard-new.component.html',
    styleUrls: ['./dashboard-new.component.css'],
    standalone: false
})
export class DashboardNewComponent implements OnInit {
    userName: string = '';

    constructor(private router: Router) { }

    ngOnInit() {
        const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        this.userName = user.userName;
    }

    logout() {
        this.router.navigate(['/login'])
    }
}
