import { Cart } from './products.data';

export interface Contact {
  name?: string;
  email?: string;
  subject?: string;
  details?: string;
  timestamp?: Date;
}

export interface BillingModel {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: {
    street: string;
    numberOrApt: string;
    city: string;
    stateOrProvince: string;
    zipcode: string;
  };
  phone?: string;
  savedPaymentMethods?: PaymentMethod[];
  purchaseHistory?: any[];
}

export interface PaymentMethod {
  id?: string;
  type?: 'credit' | 'debit' | 'paypal';
  card?: Card;
}

export interface Card {
  nameOnCard?: string;
  cardNumber?: string;
  expiration?: { month: number; year: number };
  cvv?: string;
}

export interface UserModel {
  uid?: string;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  address?: {
    street: string;
    numberOrApt: string;
    city: string;
    stateOrProvince: string;
    zipcode: string;
  };
  phone?: string;
  purchaseHistory?: any[];
  cart?: Cart;
  billing?: BillingModel;
  additionalUserInfo?: AdditionalInfo;
  wishList?: string[];
}

export interface AdditionalInfo {
  profile?: any;
  comapnyName?: string;
  bio?: string;
  isNewUser?: boolean;
  isInfoComplete?: { billing?: boolean; profile?: boolean; account?: boolean };
  memberSince?: Date;
  subscribed?: boolean;
}
