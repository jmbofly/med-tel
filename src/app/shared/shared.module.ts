import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ParallaxModule } from 'ngx-parallax';
import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalComponent } from './modal/modal.component';
import { DividerComponent } from './divider/divider.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { LoaderComponent } from './loader/loader.component';
import { ParallaxDirective } from './directives/parallax.directive';
import { BrandButtonComponent } from './brand-button/brand-button.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ChartComponent } from './chart/chart.component';
import { TableModule } from 'ngx-easy-table';
@NgModule({
  declarations: [
    CarouselComponent,
    ModalComponent,
    DividerComponent,
    ThankYouComponent,
    LoaderComponent,
    ParallaxDirective,
    BrandButtonComponent,
    SafeHtmlPipe,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule,
    NgxSkeletonLoaderModule,
    CarouselModule,
    NgxNewstickerAlbeModule,
    NgxAnimatedGradientModule,
    ParallaxModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule,
    NgxSkeletonLoaderModule,
    NgxAnimatedGradientModule,
    CarouselModule,
    ParallaxModule,
    NgxNewstickerAlbeModule,
    CarouselComponent,
    ModalComponent,
    DividerComponent,
    ThankYouComponent,
    LoaderComponent,
    ParallaxDirective,
    BrandButtonComponent,
    SafeHtmlPipe,
    ChartComponent,
  ]
})
export class SharedModule {}
