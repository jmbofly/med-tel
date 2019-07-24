/**
 * TODO: check and varify required data
 * get user billing data
 * get user cart data
 * check billing data exists and its data is valid: name, email, address, paymentMethods
 * check user cart exists and its data is valid: total, items, tax, coupon, readyForCheckout
 * if cart.coupon
 * [total = total - cart.coupon.discountedAmount]
 * [total = total * tax]
 * !paymentMethods => redirect to account#paymentMethods
 * config paypal
 */

import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { ShopService } from '../core/shop.service';
import { UserService } from '../core/user.service';
import {
  UserModel,
  BillingModel,
  PaymentMethod,
  Card,
} from '../core/user.model';
import { Product, Cart } from '../core/products.data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  userId: string;
  userCart$: Observable<Cart>;
  userBilling$: Observable<BillingModel>;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private shopService: ShopService
  ) {
    authService.getUserId().subscribe(uid => (this.userId = uid));
  }

  ngOnInit() {
    this.userCart$ = this.userService
      .getUserById(this.userId)
      .valueChanges()
      .pipe(map(user => user.cart));
    this.userBilling$ = this.userService
      .getUserById(this.userId)
      .valueChanges()
      .pipe(map(user => user.billing));
  }
}
