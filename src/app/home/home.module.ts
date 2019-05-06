import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule],
  exports: [HomeComponent],
  entryComponents: [HomeComponent],
})
export class HomeModule {}
