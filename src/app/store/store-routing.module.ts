import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreComponent,
    // children: [
    //   {
    //     path: 'category/:catId',
    //     component: ProductListComponent
    //   },
    //   {
    //     path: 'product/:productId',
    //     component: ProductDetailsComponent
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
