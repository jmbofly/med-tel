import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ElementRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  IPayPalConfig,
  ICreateOrderRequest,
  IClientAuthorizeCallbackData,
  IOnApproveCallbackData,
  IOnClickCallbackActions,
} from 'ngx-paypal';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "@nomadreservations/ngx-stripe";
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
  @ViewChild('stripeElement', { static: true }) element: ElementRef<StripeCardComponent> | any;
  userId: string;
  userCart$: Observable<Cart>;
  cart: Cart;
  showSuccess = false;
  payPalConfig: IPayPalConfig;
  stripeKey = `pk_test_9b6go30wgQUtYs7ErElUh5Fy00zgrLxYaE`;
  showPaymentWindow = false;
  newShippingAddress = false;
  shippingAddress: any;
  shippingTo: any;
  states = STATES;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#276fd3',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  error: any;
  complete = false;
  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private paymentService: PaymentService,
    private _stripe: StripeService
  ) { }

  ngOnInit() {
    this.shippingAddress = {
      address: {
        country_code: 'US',
        address_line_1: '',
        address_line_2: null,
        admin_area_2: '',
        admin_area_1: '',
        postal_code: '',
        given_name: '',
        surname: '',
        email: '',
      },
    };
    this.cart = this.shopService.cart;
    this.payPalConfig = this.initConfig(this.cart);
  }

  cardUpdated(result) {
    console.log('updated card', result)
    this.element = result.element;
    this.complete = result.card.complete;
    if (this.complete) {
      console.log('stripe element', this.element)

      // this._stripe.createToken(this.element, result)
    }
    this.error = undefined;
  }

  keyUpdated() {
    this._stripe.changeKey(this.stripeKey);
  }

  getCardToken() {
    this._stripe.createToken(this.element, {
      name: 'tested_ca',
      address_line1: '123 A Place',
      address_line2: 'Suite 100',
      address_city: 'Irving',
      address_state: 'BC',
      address_zip: 'VOE 1H0',
      address_country: 'CA'
    }).subscribe(result => {
      // Pass token to service for purchase.
      console.log(result);
    });
  }

  addShippingAddress(input: any) {
    input.full_name = `${input.given_name} ${input.surname}`;
    this.paymentService.addShippingAddress(input);
  }

  initConfig(cart: Cart): IPayPalConfig {
    const cartItems = this.shopService.items;
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
      discount: (total * cart.coupon.discountAmount).toFixed(2),
    };
    return this.paymentService.payPalConfig(unloadCart, this.showSuccess);
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

  public openPaymentModal(content: TemplateRef<any> | any, options, data) { }
}
