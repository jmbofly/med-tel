/* TODO: make method for creating new account with user email and password
 */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../core/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  hasError = false;
  errorCode = '';
  errorMessage = '';
  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  public async loginWithEmail(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        console.log(error);
      });
  }

  loggedIn() {
    return this.afAuth.authState;
  }

  public async createUserWithEmailAndPassword(
    name: string,
    email: string,
    password: string
  ) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const newUser = {
          uid: res.user.uid,
          email: res.user.email,
          firstName: name.slice(0, name.indexOf(' ')),
          lastName: name.slice(name.indexOf(' ') + 1, name.length),
          address: {
            street: '',
            numberOrApt: '',
            city: '',
            stateOrProvince: '',
            zipcode: '',
          },
          phone: '',
          purchaseHistory: [],
          additionalUserInfo: {},
        };
        this.userService.setUser(res.user.uid, newUser);
      })
      .catch(error => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        console.log(error);
      });
  }

  public async signOut() {
    return this.afAuth.auth.signOut();
  }
}
