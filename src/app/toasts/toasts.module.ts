import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ToastsComponent } from './toasts.component';
@NgModule({
  declarations: [ToastsComponent],
  exports: [ToastsComponent],
  entryComponents: [ToastsComponent],
  imports: [SharedModule],
})
export class ToastsModule {}
