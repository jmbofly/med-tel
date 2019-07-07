import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './faq.component';
import { FaqService } from './faq.service';
import { FaqListComponent } from './faq-list/faq-list.component';

@NgModule({
  declarations: [FaqComponent, FaqListComponent],
  imports: [SharedModule],
  exports: [FaqComponent, FaqListComponent],
  entryComponents: [FaqComponent, FaqListComponent],
  providers: [FaqService],
})
export class FaqModule {}
