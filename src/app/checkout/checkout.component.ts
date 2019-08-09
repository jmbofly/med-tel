import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  IClientAuthorizeCallbackData,
  IOnApproveCallbackData,
  IOnClickCallbackActions,
} from 'ngx-paypal';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { ShopService } from '../core/shop.service';
import { PaymentService } from '../core/payment.service';
import { UserService } from '../core/user.service';
import { Cart } from '../core/interfaces/cart';
import { STATES_HASH as STATES } from '../core/data/states';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  userId: string;
  userCart$: Observable<Cart>;
  cart: Cart;
  showSuccess = false;
  payPalConfig: IPayPalConfig;
  showPaymentWindow = false;
  newShippingAddress = false;
  shippingAddress: any;
  shippingTo: any;
  states = STATES;
  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.shippingAddress = {
      address: {
        country_code: 'US',
        address_line_1: '',
        address_line_2: null,
        admin_area_2: '',
        admin_area_1: '',
        postal_code: '',
      },
    };
    this.shippingTo = {
      email: '',
      given_name: '',
      surname: '',
    };
    this.cart = this.shopService.cart;
    this.payPalConfig = this.initConfig(this.cart);
    if (this.showSuccess) {
      console.log('success', this.payPalConfig);
    }
  }

  addShippingAddress(address, name?: any) {
    name.full_name = `${name.given_name} ${name.surname}`;
    this.paymentService.addShippingAddress(address, name);
  }

  initConfig(cart: Cart): IPayPalConfig {
    const cartItems = cart.items.map(id =>
      this.shopService.getProductDetails(id)
    );
    const total = cart.total;
    const tax = cart.tax;
    const shipping = this.shopService.shippingCost;
    const subtotal = this.shopService.subtotal;
    const unloadCart = {
      total: total.toFixed(2),
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      discount: (cart.total * cart.coupon.discountAmount).toFixed(2),
    };
    const payPal = this.paymentService.payPalConfig(
      unloadCart,
      this.showSuccess
    );
    return payPal;
  }

  public openPaymentResponse(content?: TemplateRef<any>, options?) {
    const data = {
      action: 'Check your email',
      headline: `for all the details about your donation`,
      title: 'So much to do, so little time',
      imgURL: '../assets/img/thank-you.png',
    };
    this.openPaymentModal(content, options, data);
  }

  public togglePaymentWindow() {
    this.showPaymentWindow = !this.showPaymentWindow;
  }

  public openPaymentModal(content: TemplateRef<any> | any, options, data) {
    this.payPalConfig = this.initConfig(data);
  }
}
