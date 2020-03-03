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
  `<b class="text-danger">MedTelPlus</b> -- Quality Healthcare Products & Solutions`,
  `<b class="text-danger">NEW</b> -- <a href="/store">CBD Crate Subscription. Delivered every month.</a>`,
  `<b class="text-danger">Coming Soon</b> -- Telemedicine powered by my911`,
].map(item => item.trim());

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('navbar', { static: true }) nav: ElementRef<NavbarComponent>;
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

  backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  colors(gradient?: any): RGBValue[] {
    // console.log('gradient', gradient)
    return gradient ? gradient : [
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
    console.log('event', event);
  }
}
