import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsComponent } from './forms/forms.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { PreferencesComponent } from './preferences/preferences.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProductsComponent } from './products/products.component';
import { AdminService } from './services/admin.service';



@NgModule({
  declarations: [AdminComponent, FormsComponent, PreferencesComponent, OrdersComponent, UsersComponent, DocumentsComponent, ProductsComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  exports: [FormsComponent, PreferencesComponent, OrdersComponent, UsersComponent, DocumentsComponent, ProductsComponent],
})
export class AdminModule { }
