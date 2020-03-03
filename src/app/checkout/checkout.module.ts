import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [SharedModule, NgxStripeModule.forRoot('pk_test_9b6go30wgQUtYs7ErElUh5Fy00zgrLxYaE'),],
})
export class CheckoutModule { }
