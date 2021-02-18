import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PreferencesComponent } from './preferences/preferences.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
    {
        path: 'admin/:id',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'orders', component: OrdersComponent },
          { path: 'documents', component: DocumentsComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'preferences/:action', component: PreferencesComponent },
          { path: '', redirectTo: 'orders', pathMatch: 'full' },
        ]
    },


    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
