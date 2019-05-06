import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [SharedModule],
  exports: [NavbarComponent],
  entryComponents: [NavbarComponent],
})
export class NavbarModule {}
