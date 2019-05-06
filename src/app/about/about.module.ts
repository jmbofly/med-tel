import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule
  ],
  exports: [AboutComponent],
  entryComponents: [AboutComponent]
})
export class AboutModule { }
