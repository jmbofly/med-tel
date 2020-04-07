import {
  NgModule,
  ErrorHandler,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// import { AuthService } from './auth.service';
// import { UserService } from './user.service';
// import { ToastService } from './toast.service';

import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  // providers: [AuthService, UserService, ToastService, ShopService],
})
export class CoreModule {}
