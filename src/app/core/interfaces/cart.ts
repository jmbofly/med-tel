import { Coupon } from './coupon';

export class Cart {
  coupon?: Coupon;
  items?: any[];
  total?: number;
  tax?: number;
  readyForCheckout?: boolean;
}
