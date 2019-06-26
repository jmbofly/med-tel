import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: AngularFirestoreCollection<UserModel>;
  users: Observable<UserModel[]>;
  constructor(public afs: AngularFirestore) {
    this.userCollection = afs.collection<UserModel>('users');
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
}
