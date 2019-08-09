import { Cart } from './cart';
import { PaymentMethod } from './payment';
export interface PurchaseHistory {
  purchaseTimestamp?: any;
  paymentMethod?: PaymentMethod;
  cart?: Cart;
  accountUserId?: string;
}
