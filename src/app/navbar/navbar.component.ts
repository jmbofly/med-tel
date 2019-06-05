import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  mobileMenu = true;
  loginMenu = false;
  userMenu = false;
  loggedIn: Observable<boolean>;
  status: string;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  async createAccount(name: string, email: string, password: string) {
    return this.authService
      .createUserWithEmailAndPassword(name, email, password)
      .then(response => {
        this.loginMenu = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/store');
        console.log('registration response', response);
      })
      .catch(err => console.log('error creating new account', err));
  }

  async login(email: string, password: string) {
    return this.authService
      .loginWithEmail(email, password)
      .then(response => {
        this.loginMenu = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/store');
        console.log('login response', response);
      })
      .catch(err => console.log('error logging in', err));
  }

  navigateTo(url: string, urlTree?: any[]) {
    this.router.navigateByUrl(url);
  }

  openLoginModal(content: TemplateRef<any>, setStatus: string) {
    this.status = setStatus;
    const modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-login-title',
    });
    modalRef.result.then(results => console.log('modal results', results));
  }

  async signOut() {
    if (this.mobileMenu) {
      this.toggleMobileMenu();
    }
    return this.authService
      .signOut()
      .then(res => this.router.navigateByUrl('/'));
  }

  toggleLoginMenu() {
    this.loginMenu = !this.loginMenu;
  }

  toggleUserMenu() {
    this.userMenu = !this.userMenu;
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  ngOnInit() {
    this.authService.loggedIn().subscribe(res => {
      this.loggedIn = new Observable(obs => {
        obs.next(res !== null);
      });
    });

    // console.log('nav', this.nav);
  }
}
