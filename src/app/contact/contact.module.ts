import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [SharedModule],
  exports: [ContactComponent],
  entryComponents: [ContactComponent],
})
export class ContactModule {}
