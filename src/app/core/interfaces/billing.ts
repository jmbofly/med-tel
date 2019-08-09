import { PaymentMethod } from './payment';
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
    country?: string;
    zipcode: string;
  };
  phone?: string;
  savedPaymentMethods?: PaymentMethod[];
  purchaseHistory?: any[];
}
