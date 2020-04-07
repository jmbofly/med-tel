import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ParallaxModule } from 'ngx-parallax';
import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';
import { CarouselComponent } from './carousel/carousel.component';
import { TabberComponent } from './tabber/tabber.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { ModalComponent } from './modal/modal.component';
import { DividerComponent } from './divider/divider.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { LoaderComponent } from './loader/loader.component';
import { ParallaxDirective } from './directives/parallax.directive';
import { BrandButtonComponent } from './brand-button/brand-button.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
@NgModule({
  declarations: [
    CarouselComponent,
    TabberComponent,
    ContactComponent,
    PricingComponent,
    ModalComponent,
    DividerComponent,
    ThankYouComponent,
    LoaderComponent,
    ParallaxDirective,
    BrandButtonComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxSkeletonLoaderModule,
    CarouselModule,
    NgxNewstickerAlbeModule,
    NgxAnimatedGradientModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxSkeletonLoaderModule,
    NgxAnimatedGradientModule,
    CarouselModule,
    ParallaxModule,
    NgxNewstickerAlbeModule,
    CarouselComponent,
    TabberComponent,
    ContactComponent,
    PricingComponent,
    ModalComponent,
    DividerComponent,
    ThankYouComponent,
    LoaderComponent,
    ParallaxDirective,
    BrandButtonComponent,
    SafeHtmlPipe,
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
    BrandButtonComponent,
  ],
})
export class SharedModule {}
