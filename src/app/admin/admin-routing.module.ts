import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PreferencesComponent } from './preferences/preferences.component';


const routes: Routes = [
    {
        path: 'admin/:id',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'forms', component: FormsComponent },
          { path: 'preferences/:action', component: PreferencesComponent },
          { path: '', redirectTo: 'forms', pathMatch: 'full' },
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
