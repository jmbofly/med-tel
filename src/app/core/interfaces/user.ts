import { Observable, BehaviorSubject } from 'rxjs';


export interface UserModel {
  uid?: string;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: Address;
  phone?: string;
  additionalUserInfo?: AdditionalInfo;
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

