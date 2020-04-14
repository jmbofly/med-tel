import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ContactComponent],
  imports: [SharedModule, FormsModule],
  exports: [],
  entryComponents: [ContactComponent],
})
export class ContactModule {}
