import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

@NgModule({
  declarations: [AccountComponent, PurchaseHistoryComponent],
  imports: [SharedModule],
  exports: [PurchaseHistoryComponent],
  entryComponents: [PurchaseHistoryComponent],
})
export class AccountModule {}
