import { Cart } from './products.data';

export class Contact {
  name?: string;
  email?: string;
  subject?: string;
  details?: string;
  timestamp?: Date;
}

export class BillingModel {
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
  savedPaymentMethods?: any[];
  purchaseHistory?: any[];
}

export class UserModel {
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
  subscribed?: boolean;
}
