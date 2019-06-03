/* TODO: make method for creating new account with user email and password
 */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  hasError = false;
  errorCode = '';
  errorMessage = '';
  constructor(private afAuth: AngularFireAuth) {}

  public async loginWithEmail(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        console.log(error);
      });
  }

  public async createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        console.log(error);
      });
  }
}
