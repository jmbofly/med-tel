import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ParallaxModule } from 'ngx-parallax';
import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselComponent } from './carousel/carousel.component';
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
    TableModule,
    NgxSkeletonLoaderModule,
    CarouselModule,
    NgxNewstickerAlbeModule,
    NgxAnimatedGradientModule,
    ParallaxModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    NgxSkeletonLoaderModule,
    NgxAnimatedGradientModule,
    CarouselModule,
    ParallaxModule,
    NgxNewstickerAlbeModule,
    CarouselComponent,
    DividerComponent,
    ThankYouComponent,
    LoaderComponent,
    ParallaxDirective,
    BrandButtonComponent,
    SafeHtmlPipe,
    ChartComponent,
    BsDropdownModule,
    AlertModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    AccordionModule,
    CollapseModule,
    TabsModule,
    TypeaheadModule,
    BsDatepickerModule,
    ProgressbarModule,
    PaginationModule,
    TimepickerModule,
  ]
})
export class SharedModule {}
