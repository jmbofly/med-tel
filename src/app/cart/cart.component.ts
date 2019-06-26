import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';
import { ShopService } from '../core/shop.service';
import { Products, Product, Cart, COUPONS } from '../core/products.data';
import { UserModel } from '../core/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = {};
  items: Product[] = [];
  subtotal = 0;
  couponUsed = false;
  userId: string;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  getCartItem(productId: string) {
    return Products.filter(
      (product: Product) => product.productId === productId
    )[0];
  }

  getItemTotal(item: Product) {
    const count = item.options.quantity;
    const total = item.price * count;
    return total;
  }

  getCartSubtotal(items: Product[]) {
    const prices = [];
    items.map(item => prices.push(this.getItemTotal(item)));
    this.subtotal = prices.reduce(this.addToTotal, 0);
    return this.subtotal;
  }

  addToTotal(total: number, a: number) {
    return total + a;
  }

  applyCoupon(couponCode: string) {
    const coupon = COUPONS.find(coup => coup.couponCode === couponCode);
    if (coupon) {
      this.couponUsed = true;
      this.cart.coupon = coupon;
      return this.subtotal / coupon.discountAmount;
    }
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  removeCoupon(couponCode) {
    this.cart.coupon = null;
    this.couponUsed = false;
    this.cart.total = this.subtotal;
  }

  getDiscountTotal(couponCode) {
    if (this.cart.coupon) {
      const discount = this.applyCoupon(couponCode);
      this.cart.total = this.subtotal - discount;
      return this.cart.total;
    }
  }

  removeItemFromCart(userId: string, item: Product) {
    const itemIdx = this.items.indexOf(item);
    this.items.splice(itemIdx, 1);
    const items = this.items.map(i => i.productId);
    this.updateCart(userId, { items });
  }

  increaseQuantity(idx: number) {
    this.items[idx].options.quantity++;
  }

  decreaseQuantity(idx: number) {
    this.items[idx].options.quantity--;
  }

  updateTotals(userId: string, tax: number) {
    this.cart.tax = tax;
    this.cart.total = this.subtotal / tax;
    this.cart.items = this.items.map(item => item.productId);
    this.cart.readyForCheckout = this.subtotal !== 0;
    this.updateCart(userId, {cart: this.cart});
  }

  updateCart(userId, cart) {
    this.shopService.userService.updateUser(userId, { cart });
  }

  readyForCheckout() {
    return this.cart.total !== 0;
  }

  ngOnInit() {
    this.authService
      .loggedIn()
      .pipe(
        map(user => user.uid),
        map(id =>
          this.shopService
            .getCurrentShopper(id)
            .valueChanges()
            .subscribe((user: UserModel) => {
              this.userId = user.uid;
              this.cart = user.cart;
              this.items = user.cart.items.map(item => this.getCartItem(item));
            })
        )
      )
      .subscribe();
  }
}
