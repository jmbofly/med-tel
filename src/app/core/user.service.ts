import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { UserModel, Contact } from './user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: AngularFirestoreCollection<UserModel>;
  users: Observable<UserModel[]>;
  contactCollection: AngularFirestoreCollection<Contact>;
  constructor(public afs: AngularFirestore) {
    this.userCollection = afs.collection<UserModel>('users');
    this.contactCollection = afs.collection<UserModel>('contacts');
    this.users = this.userCollection.valueChanges();
  }

  getUserById(userId: string) {
    return this.afs.doc<UserModel>(`users/${userId}`);
  }

  setUser(userId: string, data: UserModel) {
    return this.afs.doc(`users/${userId}`).set(data);
  }

  updateUser(userId: string, data: any) {
    return this.afs.doc(`users/${userId}`).update(data);
  }

  deleteUser(userId: string) {
    return this.afs.doc(`users/${userId}`).delete();
  }

  addNewContact(contact: Contact) {
    contact.timestamp = new Date();
    return this.contactCollection.add(contact);
  }

  getUserData(userId?: string, resData?: any, name?: string, password = null) {
    let newUser: UserModel;
    if (resData.additionalUserInfo.isNewUser) {
      console.log('User is new');
      const memberSince = new Date();
      const user = resData.user;
      const profile = resData.additionalUserInfo.profile;
      const additional = {
        isNewUser: false,
        memberSince,
        isInfoComplete: {
          billing: false,
          account: false,
          profile: false,
        },
        companyName: '',
        bio: '',
        subscribed: false,
      };
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
      this.setUser(userId, newUser);
    } else {
      this.getUserById(userId)
        .valueChanges()
        .pipe(map(user => (newUser = user)))
        .subscribe();
    }
    return Promise.resolve(newUser);
  }
}
