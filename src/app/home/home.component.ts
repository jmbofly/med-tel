import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dividers: any[];
  constructor() {}

  ngOnInit() {
    this.dividers = [
      {
        title: 'Get Peace of Mind NOW',
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor. eiusmod tempor incididunt ut labore et dolore.`,
        ctaLink: null,
      },
      {
        title: 'Get Peace of Mind NOW',
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor. eiusmod tempor incididunt ut labore et dolore.`,
        ctaLink: null,
      },
    ];
  }
}
