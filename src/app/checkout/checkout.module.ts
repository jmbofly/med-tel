import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [SharedModule],
})
export class CheckoutModule {}
