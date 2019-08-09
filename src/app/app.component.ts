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
import { Observable, BehaviorSubject } from 'rxjs';

import { NavbarComponent } from './navbar/navbar.component';
import * as Aos from 'aos';
/**
 * type for ngx-animated-gradient directive
 */
export type RGBValue = [number, number, number];
/**
 * mock data for header messages
 */
export const MOCK_HEADER_MESSAGE_DATA: string[] = [
  `<b class="text-danger">MedTelPlus</b> -- Offering top level care at an affordable price`,
  `<b class="text-danger">Sale</b> -- Buy 2 911 Help Now Medical Alerts for the price of 1(ONE)! LIMITED SUPPLY`,
  `<b class="text-danger">Coming Soon</b> -- CGX & PGX Cancer Screening. Fast, Safe, and Easy.`,
];
/**
 *  Routable animations
 */
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
  sidebarHeaderMessages: any;
  constructor() {
    this.sidebarHeaderMessages = MOCK_HEADER_MESSAGE_DATA;
  }

  ngOnInit() {
    Aos.init({
      useClassNames: true,
      animatedClassName: 'animate',
      duration: 800,
      easing: 'ease',
    });
  }

  colors(gradient?: any): RGBValue[] {
    // console.log('gradient', gradient)
    return [
      [0, 123, 255],
      [0, 123, 255],
      [46, 112, 222],
      [46, 112, 222],
      [115, 97, 174],
      [115, 97, 174],
    ];
  }

  generateHeaderMessage(username?: string) {
    if (!username) {
      return `Welcome!`;
    } else {
      return `Hey ${username}!`;
    }
  }

  getAnimationData(outlet: RouterOutlet) {
    // console.log(outlet);
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  outletData(event?: any) {
    // console.log('evnt', event);
  }
}
