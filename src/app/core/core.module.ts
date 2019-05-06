import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, UserService],
})
export class CoreModule {}
