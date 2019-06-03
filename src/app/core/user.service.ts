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
  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<UserModel>('users');
    this.users = this.userCollection.valueChanges();
  }

  getUserById(userId: string) {
    return this.userCollection.doc<UserModel>(userId);
  }

  setUser(userId: string, data: UserModel) {
    return this.userCollection.add(data);
  }

  updateUser(userId: string, data: any) {
    return this.userCollection.doc(userId).update(data);
  }

  deleteUser(userId: string) {
    return this.userCollection.doc(userId).delete();
  }
}
