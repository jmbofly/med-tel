import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  IPurchaseUnit,
  IUnitAmount,
  IClientAuthorizeCallbackData,
  IOnApproveCallbackData,
  IOnClickCallbackActions,
} from 'ngx-paypal';
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
  protected payPalClientId =
    'Aa8Wmt9UpVpXPdrPgBMxPG3ETj8c8DtP_26fa3YCZMxMuGgaHqT8sMnvTGVjsPxkA0KclfI0MOpjFc15';
  protected sandBoxClientId =
    'AWXToabbiO7T9KRXdLSHy6loQXvH9FLslq91LS-Ah8dW0C5Mo0hFwMSNfuJG8D3hmFrnRO1wMWDkcAXx';
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

  private createOrderOnClient(data?: any, cart?: any): ICreateOrderRequest {
    this.purchaseItems = cart.items;
    console.log('creating order on client...', data, cart);
    const orderObject: ICreateOrderRequest = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: cart.subtotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: cart.subtotal,
              },
            },
          },
          soft_descriptor: 'MedTelPlus LLC',
          items: [
            {
              name: 'MedTelPlus Product',
              quantity: `1`,
              category: 'PHYSICAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: cart.subtotal,
              },
            },
          ],
        },
      ],
    };
    console.log('order object: ', orderObject);
    return orderObject;
  }

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

  private onApprove(data, actions): void {
    console.log('onApprove: ', data, actions);
    actions.order.get().then(details => {
      console.log('onApprove actions.order.get(): ', details);
    });
  }

  private async onClientAuthorization(
    data?: IClientAuthorizeCallbackData | any,
    success?: boolean
  ): Promise<any> {
    console.log('onAuth start...', data);
    const payer = data.payer;
    const order: any = {
      email: payer.email_address,
      name: payer.name,
      address: data.purchase_units[0].shipping.address,
      id: payer.payer_id,
      items: this.purchaseItems,
      timestamp: data.create_time,
    };
    if (this.shippingConfig) {
      order.order = this.shippingConfig;
      order.address = this.shippingConfig.address;
    }
    (order.address = data.purchase_units[0].shipping.address),
      console.log('onClientAuthorization', data, order);
    success = true;
    return this.addNewPayment({ data, order }).then(() => {
      this.ngZone.run(() => {
        this.showSuccess = success;
        this.shopService.removeCookie('currentShopperCart');
        this.shopService.emptyCart();
        return this.router.navigateByUrl('/thank-you', {
          relativeTo: this.route,
        });
      });
    });
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

  public payPalConfig(cart, showSuccess): IPayPalConfig {
    return {
      currency: 'USD',
      clientId: this.sandBoxClientId,
      createOrderOnClient: data => this.createOrderOnClient(data, cart),
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        size: 'responsive',
      },
      onApprove: (data: IOnApproveCallbackData, actions: any) =>
        this.onApprove(data, actions),
      onClientAuthorization: data =>
        this.onClientAuthorization(data, showSuccess),
      onCancel: (data, actions) => this.onCancel(data, actions, showSuccess),
      onError: err => this.onError(err),
      onClick: (data: any, actions: IOnClickCallbackActions) =>
        this.onClick(data, actions),
    };
  }
}
