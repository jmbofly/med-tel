import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../core/user.service';
import { Products } from '../core/data/products';
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

  newsletterSent = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dividers = DIVIDERS;
  }

  navigateTo(url: string) {
    return this.router.navigateByUrl(url);
  }

  async sendNewsletter(email: string) {
    return await this.userService.addNewSubscriber(email).then(ref => {
      setTimeout(() => {
        this.newsletterSent = false;
      }, 5000);
      this.newsletterSent = true;
    });
  }

  colors(gradient?: any): RGBValue[] {
    // console.log('gradient', gradient)
    return [
      [0, 123, 255],
      [46, 112, 222],
      [115, 97, 174],
      [161, 86, 142],
      [207, 76, 110],
      [231, 71, 94],
    ];
  }
}
