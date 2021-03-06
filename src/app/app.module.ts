import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
import { NgxAnimatedGradientModule } from 'ngx-animated-gradient';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastsModule } from './toasts/toasts.module';
import { CovidModule } from './covid/covid.module';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ParallaxModule,
    NgxAnimatedGradientModule,
    SharedModule,
    CoreModule,
    NavbarModule,
    HomeModule,
    ContactModule,
    FaqModule,
    AboutModule,
    FooterModule,
    ToastsModule,
    CovidModule,
    LoginModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PageNotFoundComponent],
})
export class AppModule { }
