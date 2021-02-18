import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CookieService } from 'ngx-cookie-service';
import { filter, map } from 'rxjs/operators';

export interface DocumentData {
  [key: string]: any;
}

export interface AdminDocument {
  id?: string;
  type?: string;
  author?: string;
  date?: any;
  data?: any;
}


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentsCollectionRef: AngularFirestoreCollection<AdminDocument>;
  private buyersDocumentRef: AngularFirestoreDocument<AdminDocument>;
  private sellersDocumentRef: AngularFirestoreDocument<AdminDocument>;
  private ordersDocumentRef: AngularFirestoreDocument<AdminDocument>;
  private contactsDocumentRef: AngularFirestoreDocument<AdminDocument>;
  private leadsDocumentRef: AngularFirestoreDocument<AdminDocument>;
  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.documentsCollectionRef = afs.collection<AdminDocument>('documents');
    this.buyersDocumentRef = afs.collection<AdminDocument>('documents').doc('buyers');
    this.sellersDocumentRef = afs.collection<AdminDocument>('documents').doc('sellers');
    this.ordersDocumentRef = afs.collection<AdminDocument>('documents').doc('orders');
    this.contactsDocumentRef = afs.collection<AdminDocument>('documents').doc('contacts');
    this.leadsDocumentRef = afs.collection<AdminDocument>('documents').doc('leads');
  }

  createDocument(type, author, data: DocumentData) {
    const docId = data.name.replace(' ', '_').toUpperCase();
    const doc = {type, author, date: new Date().getDay(), id: docId}
    const ref: DocumentReference = this[`${type}sDocumentRef`];
    return ref.update(doc);
  }

  getDocuments() {
    return this.documentsCollectionRef.valueChanges();
  }

  getDocById(type: string, id: string) {
    return this.getDocuments()
      .pipe(
        map(doc => doc[type]),
        filter(d => d.id === id)
      )
  }

  getDocReference(type: string): DocumentReference {
    return this[`${type}sDocumentRef`];
  }

  delete(type: string, id: string) {
    return this.afs.doc(`${type}s/${id}`).delete();
  }

  update(type: string, id: string, data: AdminDocument) {
    return this.afs.doc(`${type}s/${id}`).update(data);
  }
}
