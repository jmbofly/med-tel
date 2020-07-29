import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsComponent } from './forms/forms.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { PreferencesComponent } from './preferences/preferences.component';



@NgModule({
  declarations: [AdminComponent, FormsComponent, PreferencesComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  exports: [PreferencesComponent]
})
export class AdminModule { }
