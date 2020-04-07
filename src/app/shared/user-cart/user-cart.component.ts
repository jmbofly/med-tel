// TODO: Add item quantity counter
// TODO: Get new taxTotal when item is added or removed 
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, combineAll, switchMap } from 'rxjs/operators';

import { ShopService } from '../../core/shop.service';
import { UserModel, CurrentShopper } from '../../core/interfaces/user';
import { Product } from '../../core/interfaces/product';
import { Products } from '../../core/data/products';
import { Coupon } from '../../core/interfaces/coupon';
import { COUPONS } from '../../core/data/coupons';
import { Cart } from '../../core/interfaces/cart';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit, OnDestroy {
  @ViewChild('coupon') coupon: any;
  @Input() isCheckout = false;
  private OHIO_SALES_TAX = 0.075;
  cart: Cart;
  items: Product[];
  subtotal: number;
  taxAmount: number;
  couponUsed = false;
  couponValid = false;
  couponDiscountString: string;

  couponDiscount: number;
  shippingCost: number;
  constructor(
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  private getCart() {
    this.shopService.cart$.subscribe();
    const orderReceipt = this.getOrderSubtotal();
    const readReceipt = receipt => {
      setTimeout(() => {
        this.shippingCost = receipt.shipping;
        this.subtotal = receipt.subtotal;
        this.taxAmount = receipt.tax;
        this.couponDiscount = receipt.discount;
      }, 1000);
    };
    this.cart = this.shopService.cart;
    this.items = this.shopService.items;
    readReceipt(orderReceipt);
  }

  getCartItem(productId: string) {
    console.log('getting cart item...');
    const counts = this.items.filter(item => item.productId === productId);
    if (counts.length >= 1) {
      // this.items.find(item => item.productId === productId).options.quantity ++;
      return;
    } else {
      return Products.filter(
        (product: Product) => product.productId === productId
      )[0];
    }
  }

  getOrderSubtotal() {
    return this.shopService.getOrderSubtotal();
  }

  addToTotal(total: number, a: number) {
    return total + a;
  }

  applyCoupon(couponCode: string) {
    return this.shopService.applyCoupon(couponCode);
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  removeCoupon(coupon) {
    this.cart.coupon = null;
    this.couponUsed = false;
    this.couponValid = false;
    coupon.value = '';
    this.shopService.updateCart(this.cart);
  }

  getDiscountTotal(couponCode?: string) {
    if (this.cart.coupon) {
      const discount = this.applyCoupon(couponCode);
      if (discount && discount !== 0) {
        this.couponValid = true;
        this.couponUsed = true;
        this.getOrderSubtotal();
        return this.cart.total * discount;
      }
    }
  }

  removeItemFromCart(item: Product, idx: number) {
    this.items = this.shopService.removeItemFromCart(item, idx);
  }

  increaseQuantity(idx: number) {
    this.items[idx].options.quantity++;
  }

  decreaseQuantity(idx: number) {
    this.items[idx].options.quantity--;
  }

  updateCartTotal() {
    this.shopService.getCartTotal();
  }

  readyForCheckout() {
    if (this.cart.total !== 0) {
      this.cart.readyForCheckout = true;
    } else {
      this.cart.readyForCheckout = false;
      return false;
    }
  }

  ngOnInit() {
    this.getCart();

    // this.subtotal = this.shopService.subtotal;
    // this.taxAmount = this.shopService.taxAmount;
    // this.couponDiscount = this.shopService.couponDiscount;
  }

  ngOnDestroy() { }
}
