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
        title: `Don't Lose Time`,
        icon: 'fa-clock-o',
        text: `Emergency alert devices bring help right away. Fire, EMS and Police dispatched to you with just the push of a button`,
        ctaLink: null,
        colors: {
          bgColor: 'bg-primary',
          title: 'text-white',
          text: 'text-white',
          cta: 'btn-outline-light',
        },
      },
      {
        title: 'Peace of Mind',
        icon: 'fa-ambulance',
        text: `Get life-saving 911 HelpNow alert devices, and quality health care providers connected to you anywhere, anytime.`,
        ctaLink: null,
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
