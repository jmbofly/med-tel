import {
  Component,
  OnInit,
  Input,
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
  hideMobileMenu = true;
  hideLoginMenu: BehaviorSubject<boolean>;
  userMenu = false;
  loggedIn: Observable<boolean>;
  status: string;
  loading: Observable<boolean>;
  navStart: Observable<NavigationStart>;
  navAuthError: Observable<any>;
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

  authStateHasChanged(url = '/store') {
    this.navigateTo(url);
    this.modalService.dismissAll();
  }

  navigateTo(url: string, urlTree?: any[]) {
    this.hideMobileMenu = true;
    this.hideLoginMenu.next(true);
    this.loader({ url });
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
    this.authService.signOut().then(res => this.navigateTo('/'));
  }

  loader(navigate = null) {
    this.loading = new Observable(obs => {
      obs.next(true);
      if (navigate) {
        setTimeout(() => {
          this.router
            .navigate([navigate.url], { relativeTo: this.route })
            .then(() => {
              this.userMenu = false;
              window.scrollTo(0, 0);
            });
          obs.next(false);
        }, 1000);
      } else {
        setTimeout(() => {
          obs.next(false);
        }, 1000);
      }
    });
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
    this.loggedIn = this.authService.loggedIn();
    this.navStart.subscribe(evt => {
      if (evt) {
        this.loader();
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
              .pipe(map(user => {
                if (user) {
                  this.navCart = user.cart;
                }
              }))
              .subscribe();
          }
        })
      )
      .subscribe();
    // console.log('nav', this.nav);
  }
}
