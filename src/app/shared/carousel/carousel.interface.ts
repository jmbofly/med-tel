import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { SlidesOutputData, CarouselComponent } from 'ngx-owl-carousel-o';
export interface Carousel extends CarouselComponent {
  id?: string;
  data?: SlidesOutputData;
}
