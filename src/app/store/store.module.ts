import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
// import { StoreService } from './store.service';

@NgModule({
  declarations: [
    StoreComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductFilterComponent,
  ],
  imports: [SharedModule],
  exports: [
    ProductDetailsComponent,
    ProductListComponent,
    ProductFilterComponent,
  ],
  entryComponents: [
    ProductDetailsComponent,
    ProductListComponent,
    ProductFilterComponent,
  ],
  // providers: [StoreService]
})
export class StoreModule {}
