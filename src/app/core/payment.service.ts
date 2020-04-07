import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import {
//   IPayPalConfig,
//   ICreateOrderRequest,
//   IPurchaseUnit,
//   IUnitAmount,
//   IClientAuthorizeCallbackData,
//   IOnApproveCallbackData,
//   IOnClickCallbackActions,
// } from 'ngx-paypal';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { ShopService } from './shop.service';
import { UserModel } from './interfaces/user';
import { Cart } from './interfaces/cart';
import { Payment } from './interfaces/payment';
import { Shipping } from './interfaces/shipping';
import { PurchaseHistory } from './interfaces/purchases';
import { Coupon } from './interfaces/coupon';
import { Contact } from './interfaces/contact';
import { BillingModel } from './interfaces/billing';
import { Product } from './interfaces/product';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  protected stripeKey = `pk_test_9b6go30wgQUtYs7ErElUh5Fy00zgrLxYaE`;
  showSuccess = false;
  purchaseAmount: any;
  /*
   *
   */
  /** items in cart for purchase */
  purchaseItems: any[];
  /*
   *
   */
  /** billing information */
  billingConfig: BillingModel;
  /*
   *
   */
  /** customer information */
  userConfig: UserModel;
  /*
   *
   */
  /** payment config */
  paymentConfig: Payment;
  /*
   *
   */
  /** shipping config */
  shippingConfig: any = false;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    public router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) { }


  addShippingAddress(input: any) {
    this.shippingConfig = input;
  }

  getPurchaseUnitItems(cart: Cart) {
    return cart.items.map((item: Product) => ({
      name: item.productName,
      quantity: item.options.quantity,
      category: 'PHYSICAL_GOODS',
      unit_amount: {
        currency_code: 'USD',
        value: item.price,
      },
    }))
  }


  private onCancel(data, actions, success?: boolean): void {
    console.log('OnCancel', data, actions);
  }

  private onError(err) {
    console.log('OnError', err);
  }

  private onClick(data, actions) {
    console.log('onClick', data, actions);
  }

  public async addNewPayment(data?: any) {
    const user: any = {};
    return await this.userService.addNewTransaction(data);
  }

}
