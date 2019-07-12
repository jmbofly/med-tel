import {
  Component,
  OnInit,
  Input,
  ErrorHandler,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import {
  Router,
  ActivatedRoute,
  NavigationStart,
  Navigation,
  NavigationError,
  ActivatedRouteSnapshot,
  NavigationEnd,
} from '@angular/router';

import { NgbModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../core/auth.service';

import { UserModel } from '../core/user.model';

import { UserService } from '../core/user.service';

import { Observable, BehaviorSubject } from 'rxjs';

import { map, filter, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('loader') loader: any;
  hideMobileMenu = true;
  hideLoginMenu: BehaviorSubject<boolean>;
  userMenu = false;
  loggedIn: Observable<boolean>;
  status: string;
  navStart: Observable<NavigationStart>;
  navAuthError: Observable<any>;
  username: string;
  navCart: UserModel['cart'];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.hideLoginMenu = new BehaviorSubject(true);
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
    this.navAuthError = router.events.pipe(map(evt => console.log(evt)));
  }

  async createAccount(name: string, email: string, password: string) {
    await this.authService
      .createUserWithEmailAndPassword(name, email, password)
      .then(response => {
        this.authStateHasChanged();
        console.log('registration response', response);
      })
      .catch(err => console.log('error creating new account', err));
  }

  login(email: string, password: string) {
    this.authService
      .loginWithEmail(email, password)
      .then(response => {
        this.authStateHasChanged();
        // console.log('login response', response);
      })
      .catch(err => console.log('error logging in', err));
  }

  googleLogin() {
    this.authService
      .googleLogin()
      .then(user => {
        // console.log('google user', user);
        this.authStateHasChanged();
      })
      .catch(err => console.log('error logging in with Google', err));
  }

  checkLogoTextColor(nav: HTMLElement, el?: HTMLElement) {
    const list = nav.classList;

    if (nav.clientWidth > 760) {
      return list.contains('aos-animate') ? '#364e59' : '#FFFFFF';
    } else {
      return '#364e59';
    }
  }

  animateLogo(): Observable<any> {
    const animate = new Observable(obs => {
      setTimeout(() => {
        obs.next(' ');
      }, 1000);
      obs.next('fin');
    });
    return animate;
  }

  authStateHasChanged(url = '/account') {
    this.navigateTo(url);
    this.modalService.dismissAll();
  }

  getMenuPos(targetButton: HTMLElement) {
    return targetButton.offsetLeft;
  }

  navigateTo(url: string, urlTree?: any[]) {
    this.hideMobileMenu = true;
    this.hideLoginMenu.next(true);
    this.userMenu = false;

    this.loader.load({
      url,
    });
  }

  openLoginModal(content: TemplateRef<any>, setStatus: string) {
    this.status = setStatus;

    const modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-login-title',
    });
    modalRef.result.then(results => console.log('modal results', results));
  }

  signOut() {
    if (!this.hideMobileMenu) {
      this.toggleMobileMenu();
    }

    this.router
      .navigateByUrl('/')
      .then(res => (res ? this.authService.signOut() : this.signOut()))
      .catch(err => console.log('ERROR', err));
  }

  toggleLoginMenu() {
    const hidden = this.hideLoginMenu.getValue();
    this.hideLoginMenu.next(!hidden);
  }

  toggleUserMenu() {
    this.userMenu = !this.userMenu;
  }

  toggleMobileMenu() {
    this.hideMobileMenu = !this.hideMobileMenu;
  }

  ngOnInit() {
    this.username = '';
    this.loggedIn = this.authService.loggedIn();
    this.navStart.subscribe(evt => {
      if (evt) {
        this.loader.load();
      }
    });

    this.authService
      .getUserId()
      .pipe(
        tap(uid => {
          if (uid) {
            this.userService
              .getUserById(uid)
              .valueChanges()
              .pipe(
                map(user => {
                  if (user) {
                    this.username =
                      user.username || user.firstName || 'New User';
                    this.navCart = user.cart;
                  }
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();
  }
}
