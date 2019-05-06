import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [SharedModule],
  exports: [FooterComponent],
  entryComponents: [FooterComponent],
})
export class FooterModule {}
