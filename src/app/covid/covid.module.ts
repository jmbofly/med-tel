import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CovidComponent } from './covid.component';


@NgModule({
  declarations: [CovidComponent],
  imports: [
    SharedModule,
    HttpClientModule,
  ],
  entryComponents: [CovidComponent]
})
export class CovidModule { }
