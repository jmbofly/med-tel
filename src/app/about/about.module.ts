import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [SharedModule],
  exports: [AboutComponent],
  entryComponents: [AboutComponent],
})
export class AboutModule {}
