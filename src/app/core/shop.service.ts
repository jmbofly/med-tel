// TODO: refactor this.cart as Observables
// TODO: refactor components and services that use shopService.cart

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, every, pairwise, filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  Query,
  DocumentData,
} from '@angular/fire/firestore';
import { UserService } from './user.service';
import { UserModel, CurrentShopper } from './interfaces/user';
import { Products } from './data/products';
import { Coupon } from './interfaces/coupon';
import { COUPONS } from './data/coupons';
import { Product } from './interfaces/product';
import { Cart } from './interfaces/cart';
import { BillingModel } from '../core/interfaces/billing';
import { PaymentMethod } from './interfaces/payment';
import { Shipping } from './interfaces/shipping';
import { PurchaseHistory } from './interfaces/purchases';
import { AuthService } from './auth.service';
import { User } from 'firebase';
import 'firebase/firestore';
export const OHIO_SALES_TAX = 0.075;
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
  /** cart cache initialized */
  cart: Cart;
  /*
   *
   */
  /** cart.items cache initialized */
  items: Product[];
  /*
   *
   */
  /** cart cache observable */
  cart$: BehaviorSubject<Cart>;
  /*
   *
   */
  /** cart subtotal = cart.total + tax - discount */
  subtotal = 0.0;
  /*
   *
   */
  /** order tax */
  taxAmount = 0.0;
  /*
   *
   */
  /** coupon has been entered */
  couponUsed = false;
  /*
   *
   */
  /** coupon is valid */
  couponValid = false;
  /*
   *
   */
  /** coupon name string */
  couponDiscountString: string;
  /*
   *
   */
  /** coupon discount amount */
  couponDiscount: number;
  /*
   *
   */
  /** cost of shipping order */
  shippingCost = 4.99;
  /*
   *
   */
  /** cookie storage key */
  cookieKey = 'currentShopperCart';
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
    /** private - inject Ngx CookieService */
    private cookieService: CookieService
  ) {
    this.cart$ = new BehaviorSubject(null);
  }
  /*
   *
   */
  /** initiate Observable streams */
  initNewShopper() {
    if (this.checkIfCookie(this.cookieKey)) {
      this.cart = this.getCookie(this.cookieKey);
      this.items = this.cart.items.map(item => this.getProductDetails(item));
      this.getOrderSubtotal();
      this.getCartTotal();
    } else {
      this.cart = {
        items: [],
        coupon: {
          couponCode: null,
          discountAmount: 0,
          expiresOn: null,
        },
        total: 0,
        tax: 0,
        readyForCheckout: false,
      };
    }
    this.updateCart(this.cart, true);
  }

  addToTotal(price: number) {
    this.cart.total += price;
    this.updateCart(this.cart);
  }

  applyCoupon(couponCode?: string): number {
    // console.log('applying coupon...', this.cart);
    const coupon = COUPONS.find(coup => coup.couponCode === couponCode);
    if (coupon) {
      this.cart.coupon = coupon;
      this.couponDiscount = coupon.discountAmount;
      this.couponUsed = true;
      this.couponValid = true;
      this.getOrderSubtotal();
      return this.cart.total * coupon.discountAmount;
    } else if (!COUPONS.includes({ couponCode })) {
      this.couponValid = false;
      this.couponUsed = true;
      this.couponDiscount = 0;
    }
  }

  getOrderSubtotal() {
    const prices = this.items.map(item => this.getProductPrice(item));
    const cartTotal = prices[0]
      ? prices.reduce((prev: number, curr: number) => this.addNums(prev, curr))
      : 0;
    this.taxAmount = this.getTax(cartTotal, OHIO_SALES_TAX);
    const discount = this.couponValid ? cartTotal * this.couponDiscount : 0;
    this.subtotal =
      this.addNums(cartTotal, this.taxAmount) + this.shippingCost - discount;
    return {
      tax: this.taxAmount,
      shipping: this.shippingCost,
      subtotal: this.subtotal,
      discount,
    };
  }

  private getTax(total, tax) {
    return total * tax;
  }

  private addNums(a: number, b: number) {
    return a + b;
  }

  getProductDetails(productId?: string): Product {
    if (!productId) {
      return;
    }
    // console.log('getting cart item details...');
    const item = this.availableProducts.filter(i => i.productId === productId);
    return item.length ? item[0] : null;
  }

  getProductPrice(item?: Product) {
    // console.log('getting cart item total...');
    if (!item) {
      return;
    } else {
      const count = item.options.quantity;
      return (item.price * count);
    }
  }

  emptyCart() {
    this.items = null;
    this.cart = null;
    this.subtotal = 0;
    this.taxAmount = 0;
    this.couponValid = false;
    this.couponUsed = true;
    this.couponDiscount = 0;
    this.updateCart(null, true);
    this.initNewShopper();
  }

  getCartTotal() {
    const total = this.items
      .map(item => this.getProductPrice(item))
      .reduce((prev, curr) => this.addNums(prev, curr), 0);
    console.log('cart total', this.cart.total);
    const tax = this.getTax(this.cart.total, OHIO_SALES_TAX);
    this.cart.total = total;
    this.cart.tax = tax;
    this.updateCart(this.cart);
    return total;
  }

  setCookie(key: string, cart: Cart) {
    this.cookieService.set(key, JSON.stringify(cart));
  }

  getCookie(key: string) {
    const objectString = this.cookieService.get(key);
    return JSON.parse(objectString);
  }

  removeCookie(key) {
    this.cookieService.delete('currentShopperCart');
  }

  checkIfCookie(key: string) {
    return this.cookieService.check('currentShopperCart');
  }

  addToCart(productId?: string) {
    this.cart.items.push(productId);
    this.items = this.cart.items.map(id => this.getProductDetails(id));
    this.getCartTotal();
    this.getOrderSubtotal();
    // console.log('item added to cart', productId);
  }
  removeItemFromCart(item: Product, idx: number) {
    this.cart.items.splice(idx, 1);
    if (this.cart.items.length) {
      this.items = this.cart.items.map(itm => this.getProductDetails(itm));
      this.getCartTotal();
      this.getOrderSubtotal();
      return this.items;
    } else {
      this.emptyCart();
      return null;
    }
  }

  updateCart(cart: Cart, remove = false) {
    if (!cart && remove) {
      this.removeCookie(this.cookieKey);
      return this.cart$.next(cart);
    }
    this.setCookie(this.cookieKey, cart);
    return this.cart$.next(cart);
  }
}
