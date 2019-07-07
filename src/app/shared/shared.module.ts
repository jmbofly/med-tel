import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ParallaxModule } from 'ngx-parallax';

import { CarouselComponent } from './carousel/carousel.component';
import { TabberComponent } from './tabber/tabber.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { ModalComponent } from './modal/modal.component';
import { DividerComponent } from './divider/divider.component';
import { ParallaxDirective } from './directives/parallax.directive';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    CarouselComponent,
    TabberComponent,
    ContactComponent,
    PricingComponent,
    ModalComponent,
    DividerComponent,
    ParallaxDirective,
    ThankYouComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, FormsModule, CarouselModule],
  exports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ParallaxModule,
    CarouselComponent,
    TabberComponent,
    ContactComponent,
    PricingComponent,
    ModalComponent,
    DividerComponent,
    ParallaxDirective,
    ThankYouComponent,
    LoaderComponent,
  ],
  entryComponents: [
    CarouselComponent,
    TabberComponent,
    ContactComponent,
    PricingComponent,
    ModalComponent,
    DividerComponent,
    ThankYouComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
