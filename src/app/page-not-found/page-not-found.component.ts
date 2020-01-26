import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export type RGBValue = [number, number, number];

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public navigateTo(url = '/home') {
    return this.router.navigateByUrl(url);
  }
  public colors(gradient?: any): RGBValue[] {
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
