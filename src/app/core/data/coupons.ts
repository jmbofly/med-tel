import { Coupon } from '../interfaces/coupon';
export const COUPONS: Coupon[] = [
  {
    couponCode: 'VET',
    expiresOn: new Date().setDate(new Date().getDate() - 30),
    discountAmount: 0.05,
    discountName: '5% OFF',
  },
  {
    couponCode: 'NEWACCOUNT',
    expiresOn: new Date().setDate(new Date().getDate() - 30),
    discountAmount: 0.1,
    discountName: '10% OFF',
  },
];
