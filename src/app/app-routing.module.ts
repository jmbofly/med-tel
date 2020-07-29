import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { ThankYouComponent } from './shared/thank-you/thank-you.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CovidComponent } from './covid/covid.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,

  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
  },
  {
    path: 'covid-updates',
    component: CovidComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
