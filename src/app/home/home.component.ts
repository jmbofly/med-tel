// TODO: MouseMove Event control
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Products } from '../core/products.data';
import { Divider, DIVIDERS } from './home.data';

export type RGBValue = [number, number, number];

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
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.dividers = DIVIDERS;
  }

  colors(gradient?: any): RGBValue[] {
    // console.log('gradient', gradient)
    return [
      [238, 238, 238],
      [131, 120, 233],
      [232, 104, 122],
      [238, 238, 238],
      [131, 120, 233],
      [232, 104, 122],
    ];
  }
}
