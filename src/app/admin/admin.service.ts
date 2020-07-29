import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CookieService } from 'ngx-cookie-service';

export interface AdminData {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _adminId: any;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private cookieService: CookieService) {
  }

  getAdminData(adminId: string) {
    return this.afs.doc<AdminData>(`admins/${adminId}`);
  }

  addAdminData(adminId: string, data: any) {
    return this.afs.doc(`admins/${adminId}`).update(data);
  }

  checkCookie(adminId: string) {
    return this.cookieService.check('admin_id');
  }
  getCookie(name: string) {
    return this.cookieService.get(name);
  }
  setCookie(adminId: string) {
    this.cookieService.set('admin_id', adminId, 30);
  }
}
