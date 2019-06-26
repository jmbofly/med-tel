import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './faq.component';

@NgModule({
  declarations: [FaqComponent],
  imports: [SharedModule],
  exports: [FaqComponent],
  entryComponents: [FaqComponent],
})
export class FaqModule {}
