// TODO: MouseMove Event control
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Products } from '../core/products.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dividers: any[];
  bannerRow1Products = Products.filter((item, idx) => idx <= 1);
  bannerRow2Products = Products.filter((item, idx) => idx >= 2 && idx <= 3);
  bannerRow3Products = Products.filter((item, idx) => idx === 4);
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.dividers = [
      {
        title: `Don't wait till it's too late!`,
        icon: 'fa-clock-o',
        text: `911 Help Now devices bring first
         responders right away. <br/>
         Fire, EMS and Police dispatched to you with
          just the push of a button`,
        ctaLink: 'store',
        colors: {
          bgColor: 'bg-primary',
          title: 'text-white',
          text: 'text-white',
          cta: 'btn-outline-light',
        },
      },
      {
        title: 'Just the push of a button away',
        icon: 'fa-ambulance',
        text: `Get life-saving 911 Help Now devices, and find out what fast and reliable really means.`,
        ctaLink: 'store',
        colors: {
          bgColor: 'bg-default',
          title: 'text-primary',
          text: 'text-black text-muted',
          cta: 'btn-outline-dark',
        },
      },
    ];
  }
}
