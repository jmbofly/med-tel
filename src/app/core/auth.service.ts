import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { UserService } from '../core/user.service';
import { UserModel } from '../core/interfaces/user';
import { map, switchMap } from 'rxjs/operators';
import 'firebase/firestore';
import { CookieService } from 'ngx-cookie-service';
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
    private cookieService: CookieService,
    public userService: UserService
  ) { }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return await this.afAuth.auth.signInWithPopup(provider).then(user => {
      this.user = user;
      // console.log('user', user);
      return this.getOrAddUser(user.user.uid, user, user.user.displayName);
    });
  }

  // Check if user is logged in
  // @returns boolean
  loggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  getUserId() {
    return this.afAuth.authState.pipe(
      map(fbUser => (fbUser ? fbUser.uid : null))
    );
  }

  // Login with simple email and password
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth
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
        return this.getOrAddUser(res.user.uid, res, name, password);
      })
      .catch(error => {
        // console.log(error);
      });
  }

  // SignOut
  signOut() {
    return this.afAuth.auth.signOut();
  }

  // Add new user data to database by ID
  // Split name string into first and last
  // Set user defaults
  getOrAddUser(userId: string, resData: any, name: string, password = null) {
    // this.userService.getUserData(userId, resData, name, password);
  }
}
