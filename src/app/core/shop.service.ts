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
import { Products, Product, Cart, Coupon } from './products.data';
import {
  UserModel,
  CurrentShopper,
  BillingModel,
  PaymentMethod,
  PurchaseHistory,
} from './user.model';
import { AuthService } from './auth.service';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  /*
   *
   */
  /** products that are available for purchase */
  availableProducts = Products;
  /*
   *
   */
  /** products available for purchase */
  inventorySize = Products.length;
  /*
   *
   */
  /** current user unique id */
  userId: string;
  /*
   *
   */
  /** current user Observable --- NOT the same as currentShopper$!!!!! --- */
  user$: Observable<UserModel>;
  /*
   *
   */
  /** current user purchase history */
  purchaseHistory: UserModel['purchaseHistory'];
  /*
   *
   */
  /** AngularFirestore Collection of coupons available for use */
  couponCollection: AngularFirestoreCollection<Coupon>;
  /*
   *
   */
  /** current shopper Observable. --- NOT the same as user$!!!!! --- */
  currentShopper$: Observable<CurrentShopper>;
  /*
   *
   */
  /** current user cart Observable */
  userCart$: Observable<Cart>;
  /*
   *
   */
  /** current user billing Observable */
  userBilling$: Observable<BillingModel>;
  /*
   *
   */
  /** current user address Observable */
  userAddress$: Observable<UserModel['address']>;
  /*
   *
   */
  /** current shopper saved payment methods Observable */
  userSavedPaymentMethods$: Observable<PaymentMethod[]>;
  /*
   *
   */
  /** current user purchase history Observable */
  userPurchaseHistory$: Observable<PurchaseHistory[]>;
  /*
   *
   */
  /** current user wish list Observable */
  userWishList$: Observable<string[]>;
  /*
   *
   */
  /** guest cart Observable */
  guestCart$: Observable<Cart>;
  /*
   *
   */
  /** constructor */
  constructor(
    /*
     *
     */
    /** private - inject AngularFirestore */
    private afs: AngularFirestore,
    /*
     *
     */
    /** private - inject UserService */
    private userService: UserService,
    /*
     *
     */
    /** private - inject AuthService */
    private authService: AuthService
  ) {
    /*
     *
     */
    /** AngularFirestoreCollection of valid coupons */
    this.couponCollection = afs.collection<Coupon>('coupons');
    /*
     *
     */
    /** get current user id */
    authService.getUserId().subscribe(uid => (this.userId = uid));
  }
  /*
   *
   */
  /** get current user Observable */
  getCurrentShopper(userId: string) {
    return this.afs.doc<UserModel>(`users/${userId}`).valueChanges();
  }
  /*
   *
   */
  /** initiate Observable streams on currentShopper$ */
  initNewShopper(userId?: string) {
    const currentData = this.getCurrentShopper(this.userId);
    const currentShopper: CurrentShopper = {
      user: currentData,
      cart: currentData.pipe(map(user => user.cart)),
      billing: currentData.pipe(map(user => user.billing)),
      address: currentData.pipe(map(user => user.billing.address)),
      savedPaymentMethods: currentData.pipe(
        map(user => user.billing.savedPaymentMethods)
      ),
      purchaseHistory: currentData.pipe(
        map(user => user.billing.purchaseHistory)
      ),
      wishList: currentData.pipe(map(user => user.wishList)),
    };
    this.currentShopper$ = new Observable(obs => {
      obs.next(currentShopper);
    });
    this.userCart$ = currentShopper.cart;
    this.userBilling$ = currentShopper.billing;
    this.userAddress$ = currentShopper.address;
    this.userSavedPaymentMethods$ = currentShopper.savedPaymentMethods;
    this.userPurchaseHistory$ = currentShopper.purchaseHistory;
    this.userWishList$ = currentShopper.wishList;
    this.user$ = currentShopper.user;
    return currentShopper;
  }

  getProductDetails(productId: string) {
    const item = this.availableProducts.filter(i => i.productId === productId);
    console.log('filtered product', item[0]);
    return item.length ? item[0] : null;
  }

  updateCart(userId: string, cart: Cart) {
    this.userService.updateUser(this.userId, { cart });
  }

  addToCart(userId: string, productId: string, cart: Cart) {
    cart.items.push(productId);
    console.log('user cart', cart);
    this.userService.updateUser(this.userId, { cart });
  }

  // applyCoupon(couponCode: string) {
  //   this.afs.doc('coupons/available').valueChanges().pipe(
  //     map(coupons => {
  //       const couponIsValid = coupons.filter(c => c.couponCode === couponCode).length !== 0;
  //     }),
  //   )
  // }
}
