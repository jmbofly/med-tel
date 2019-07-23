import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [SharedModule],
  entryComponents: [CartComponent],
  exports: [CartComponent],
})
export class CartModule {}
