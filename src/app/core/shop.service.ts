import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  Query,
  DocumentData,
} from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Products, Cart, Coupon } from './products.data';
import { UserModel } from './user.model';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  availableProducts = Products;
  inventorySize = Products.length;
  purchaseHistory: UserModel['purchaseHistory'];
  couponCollection: AngularFirestoreCollection<Coupon>;
  constructor(public afs: AngularFirestore, public userService: UserService) {
    this.couponCollection = afs.collection<Coupon>('coupons');
  }

  getCurrentShopper(userId: string) {
    return this.afs.doc(`users/${userId}`);
  }

  getProductDetails(productId: string) {
    const item = this.availableProducts.filter(i => i.productId === productId);
    console.log('filtered product', item[0]);
    return item.length ? item[0] : null;
  }

  updateCart(userId, cart: Cart) {
    this.userService.updateUser(userId, {cart});
  }

  addToCart(userId: string, productId: string, cart: Cart) {
    cart.items.push(productId);
    console.log('user cart', cart);
    this.userService.updateUser(userId, { cart });
  }

  // applyCoupon(couponCode: string) {
  //   this.afs.doc('coupons/available').valueChanges().pipe(
  //     map(coupons => {
  //       const couponIsValid = coupons.filter(c => c.couponCode === couponCode).length !== 0;
  //     }),
  //   )
  // }
}
