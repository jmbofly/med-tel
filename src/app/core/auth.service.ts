/* TODO: make method for creating new account with user email and password
 */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { UserService } from '../core/user.service';
import { UserModel } from '../core/user.model';
import { map } from 'rxjs/operators';

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
    public userService: UserService
  ) {}

  // Login with Google
  // @returns firebase DocumentReference
  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return await this.afAuth.auth.signInWithPopup(provider).then(user => {
      // console.log('user', user);
      return this.addNewUserData(user.user.uid, user, user.user.displayName);
    });
  }

  // Check if user is logged in and
  // @returns user auth state as Observable
  loggedIn() {
    return this.afAuth.authState;
  }

  getUserId() {
    return this.loggedIn().pipe(map(user => user.uid));
  }

  // Login with simple email and password
  async loginWithEmail(email: string, password: string) {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      });
  }

  // Create new user account with email and password
  // Logs user in and adds new userData to database
  // @returns DocumentRef Promise
  async createUserWithEmailAndPassword(
    name: string,
    email: string,
    password: string
  ) {
    return await this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // Add new user data
        return this.addNewUserData(res.user.uid, res, name, password);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // SignOut
  signOut() {
    return this.afAuth.auth.signOut();
  }

  // Add new user data to database by ID
  // Split name string into first and last
  // Set user defaults
  addNewUserData(userId: string, resData: any, name: string, password = null) {
    let newUser: UserModel;
    const additional = {
      isNewUser: false,
      companyName: '',
      bio: '',
      subscribed: false,
    };
    if (resData.additionalUserInfo.isNewUser) {
      console.log('User is new');
      const user = resData.user;
      const profile = resData.additionalUserInfo.profile;
      newUser = {
        uid: userId,
        password,
        username: name.slice(0, name.indexOf(' ')),
        email: user.email,
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
        photoURL: user.photoURL || 'assets/images/icons/user.png',
        purchaseHistory: [],
        cart: {
          coupon: null,
          items: [],
          total: 0,
          tax: 0,
          readyForCheckout: false,
        },
        billing: {
          firstName: '',
          lastName: '',
          email: '',
          address: {
            street: '',
            numberOrApt: '',
            city: '',
            stateOrProvince: '',
            zipcode: '',
          },
          phone: '',
          purchaseHistory: [],
          savedPaymentMethods: [],
        },
        additionalUserInfo: profile
          ? { profile, ...additional }
          : { ...additional },
        wishList: [],
      };

      // window.localStorage.setItem('currentUserEmail', newUser.email);
      this.userService.setUser(userId, newUser);
    }
    return Promise.resolve(newUser);
  }
}
