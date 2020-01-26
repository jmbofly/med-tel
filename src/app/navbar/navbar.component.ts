import {
  Component,
  OnInit,
  Input,
  ErrorHandler,
  TemplateRef,
  ElementRef,
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
import { STATES_HASH as states } from '../core/data/states';
import { UserModel } from '../core/interfaces/user';
import { UserService } from '../core/user.service';
import { ShopService } from '../core/shop.service';

import { Observable, BehaviorSubject } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('loader') loader: any;
  @ViewChild('nav') navbar: any;
  hideMobileMenu: boolean;
  status: string;
  query: string;
  search: any;
  navStart: Observable<NavigationStart>;
  navAuthError: Observable<any>;
  navCart: UserModel['cart'];
  navClientWidth$: BehaviorSubject<number>;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private modalService: NgbModal,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
    this.navAuthError = router.events.pipe(
      filter(evt => evt instanceof NavigationError)
    ) as Observable<NavigationError>;
    const stateNames = states.map(state => state.name.toLowerCase());
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term =>
          term.length < 2
            ? []
            : stateNames
                .filter(v => v.indexOf(term.toLowerCase()) > -1)
                .slice(0, 10)
        )
      );
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

  animateElement(
    elementId: string,
    styleProp: string,
    styleVal: string,
    duration: number
  ) {
    const el = document.getElementById(elementId);
    el.style[styleProp] = styleVal;
    el.style.transition = styleProp + ` ${duration}s`;
  }

  navigateTo(url: string, urlTree?: any[]) {
    if (url === '/cart' && !this.navCart.items.length) {
      return;
    }
    this.hideMobileMenu = true;
    this.loader.load({
      url,
    });
  }
  toggleMobileMenu() {
    this.hideMobileMenu = !this.hideMobileMenu;
  }

  ngOnInit() {
    this.hideMobileMenu = true;
    this.query = '';
    this.navClientWidth$ = new BehaviorSubject(
      this.navbar.nativeElement.clientWidth
    );

    this.navStart.subscribe(evt => {
      if (evt) {
        this.loader.load();
      }
    });
    this.shopService.initNewShopper();
    this.shopService.cart$.subscribe(cart => (this.navCart = cart));
    // this.navClientWidth$.subscribe(val => {
    //   if (val < 1200) {
    //     this.hideMobileMenu = true;
    //   } else {
    //     this.hideMobileMenu = false;
    //   }
    // });
  }
}
