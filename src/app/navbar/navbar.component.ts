import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar') nav;
  mobileMenu = true;
  constructor() {}

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }
  ngOnInit() {
    // console.log('nav', this.nav);
  }
}
