import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { UserModel } from './interfaces/user';
import { Contact } from './interfaces/contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Subscriber {
  email?: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: AngularFirestoreCollection<UserModel>;
  users: Observable<UserModel[]>;
  contactCollection: AngularFirestoreCollection<Contact>;
  subscriberCollection: AngularFirestoreCollection<Subscriber>;
  transactionCollection: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore) {
    this.contactCollection = afs.collection<UserModel>('contacts');
    this.subscriberCollection = afs.collection<UserModel>('subscribers');
    this.transactionCollection = afs.collection<any>('transactions');
    this.userCollection = afs.collection<UserModel>('users');
    this.users = this.userCollection.valueChanges();
  }

  getUserById(userId: string) {
    return this.afs.doc<UserModel>(`users/${userId}`);
  }

  async setUser(userId: string, data: UserModel) {
    return await this.afs.doc<UserModel>(`users/${userId}`).set(data);
  }

  async updateUser(userId: string, data: any) {
    return await this.afs.doc<UserModel>(`users/${userId}`).update(data);
  }

  async deleteUser(userId: string) {
    return await this.afs.doc<UserModel>(`users/${userId}`).delete();
  }

  async addNewContact(contact: Contact) {
    contact.timestamp = new Date();
    return await this.contactCollection.add(contact);
  }

  async addNewSubscriber(email?: string) {
    const timestamp = new Date();
    return await this.subscriberCollection.add({ email, timestamp });
  }

  async addNewTransaction(transaction: any) {
    return await this.transactionCollection.add(transaction);
  }
}
