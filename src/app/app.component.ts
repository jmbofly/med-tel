import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
} from '@angular/animations';
import { NavbarComponent } from './navbar/navbar.component';
import * as Aos from 'aos';

// Routable animations
export const slideInAnimation = trigger('routeAnimation', [
  transition('heroes <=> hero', [
    style({ position: 'relative', transition: 'all .75s' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(
          '300ms ease-out',
          style({ transform: 'tanslate3d(100%, 0 0)' })
        ),
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ transform: 'tanslate3d(0, 0 0)' })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  @ViewChild('navbar') nav: ElementRef<NavbarComponent>;
  title = 'MedTelPlus';
  constructor() {}

  getAnimationData(outlet: RouterOutlet) {
    // console.log(outlet);
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  outletData(event?: any) {
    // console.log('evnt', event);
  }

  ngOnInit() {
    Aos.init({
      useClassNames: true,
      animatedClassName: 'animate',
      duration: 800,
      easing: 'ease',
    });
    const doc = document.querySelector('#page-content-wrapper');
    // doc.addEventListener('click', e => {
    //   this.nav.nativeElement.toggleMobileMenu();
    // });
  }
}
