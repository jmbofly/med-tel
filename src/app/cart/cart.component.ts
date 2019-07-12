import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  @ViewChild('coupon') coupon: any;
  cart: Cart = {};
  items: Product[] = [];
  subtotal = 0;
  couponUsed = false;
  couponValid = false;
  userId: string;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  getCartItem(productId: string) {
    const counts = this.items.filter(item => item.productId === productId);
    if (counts.length >= 1) {
      return;
    } else {
      return Products.filter(
        (product: Product) => product.productId === productId
      )[0];
    }
  }

  getItemTotal(item: Product) {
    if (!item) { return; }
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
      this.couponValid = true;
      return this.subtotal / coupon.discountAmount;
    } else if (!COUPONS.includes({ couponCode })) {
      this.couponValid = false;
      this.couponUsed = true;
    }
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  removeCoupon(coupon) {
    this.cart.coupon = null;
    this.couponUsed = false;
    this.couponValid = false;
    this.cart.total = this.subtotal;
    coupon.value = '';
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
    this.items.map(i => this.getCartItem(i.productId));
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
    this.cart.readyForCheckout = this.subtotal > 0;
    this.updateCart(userId, this.cart);
    // this.items = this.cart.items.map(item => this.getCartItem(item));
  }

  updateCart(userId: string, cart: Cart) {
    this.shopService.userService.updateUser(userId, { cart });
  }

  readyForCheckout() {
    return this.cart.total !== 0;
  }

  ngOnInit() {
    this.authService
      .getUserId()
      .pipe(
        map(id =>
          this.shopService
            .getCurrentShopper(id)
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
