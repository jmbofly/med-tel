import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ParallaxModule } from 'ngx-parallax';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { AboutModule } from './about/about.module';
import { FooterModule } from './footer/footer.module';
import { StoreModule } from './store/store.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CartModule } from './cart/cart.module';
import { AccountModule } from './account/account.module';
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModalModule,
    NgbCollapseModule,
    ParallaxModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    ContactModule,
    FaqModule,
    AboutModule,
    FooterModule,
    StoreModule,
    CheckoutModule,
    CartModule,
    AccountModule,
    NgxAnimatedGradientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
