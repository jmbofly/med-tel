import { Observable, BehaviorSubject } from 'rxjs';
import { BillingModel } from './billing';
import { Cart } from './cart';
import { PurchaseHistory } from './purchases';
import { PaymentMethod } from './payment';

export interface UserModel {
  uid?: string;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: Address;
  phone?: string;
  cart?: Cart;
  billing?: BillingModel;
  additionalUserInfo?: AdditionalInfo;
  wishList?: string[];
}

export interface Address {
  street: string;
  numberOrApt: string;
  city: string;
  stateOrProvince: string;
  country?: string;
  zipcode: string;
}

export interface AdditionalInfo {
  profile?: any;
  isNewUser?: boolean;
  memberSince?: Date;
  subscribed?: boolean;
}

export interface CurrentShopper {
  billing?: Observable<BillingModel>;
  cart?: Observable<Cart>;
  purchaseHistory?: Observable<UserModel['billing']['purchaseHistory']>;
  savedPaymentMethods?: Observable<PaymentMethod[]>;
  user?: Observable<UserModel>;
  address?: Observable<BillingModel['address']>;
  wishList?: Observable<UserModel['wishList']>;
}
