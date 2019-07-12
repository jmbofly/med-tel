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
// import {
//   AngularFireFunctionsModule,
//   FunctionsRegionToken,
// } from '@angular/fire/functions';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ShopService } from './shop.service';
import { environment } from '../../environments/environment';

// export const FUNCTIONS_ORIGIN = new InjectionToken<string>(
//   'angularfire2.functions.origin'
// );
// export const FUNCTIONS_REGION = FunctionsRegionToken;

// import * as Sentry from '@sentry/browser';

// Sentry.init({
//   dsn: 'https://aa859b4a491444258c2884fd106207dc@sentry.io/1500786',
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() {}
//   handleError(error) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    /* AngularFireFunctionsModule */
    AngularFirestoreModule,
  ],
  providers: [
    AuthService,
    UserService,
    ShopService,
    /* { provide: FUNCTIONS_ORIGIN, useValue: 'https://medtelplus.com' }, */
    /** { provide: ErrorHandler, useClass: SentryErrorHandler } */
  ],
})
export class CoreModule {}
