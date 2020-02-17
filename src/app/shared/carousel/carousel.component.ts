import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { SlidesOutputData, CarouselComponent as Owl } from 'ngx-owl-carousel-o';
import { Carousel } from './carousel.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @ViewChild('carousel') carousel;
  @Input() section: 'hero' | 'store' | 'testimonial' | 'simple';
  @Input() classes: string[];
  @Input() options: Owl['options'];
  @Input() slides: any[];
  defaultOptions: Owl['options'];
  activeSlides: SlidesOutputData;

  slidesStore: any[];

  constructor() {}

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  ngOnInit() {
    this.defaultOptions = {
      autoplay: true,
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      navText: [
        '<span class="ion-ios-arrow-back">',
        '<span class="ion-ios-arrow-forward">',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    };
  }
}
