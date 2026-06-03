import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-new',
  templateUrl: './menu-new.component.html',
  styleUrls: ['./menu-new.component.css'],
  standalone: false
})
export class MenuNewComponent implements OnInit {

  activeLink: string = '';
  userName: string = '';

  constructor(private router: Router) { }

  setActive(link: string) {
    this.activeLink = link;
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userName = user.userName;
  }

  logout() {
    this.router.navigate(['/login'])
  }
}