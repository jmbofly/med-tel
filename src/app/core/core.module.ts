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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
})
export class CoreModule {}
