import { UserModel as User } from './user';
export class Shipping {
  uid?: string;
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
  additionalUserInfo?: any;
}
