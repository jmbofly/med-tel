export interface UserModel {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    numberOrApt: string;
    city: string;
    stateOrProvince: string;
  };
  phone: string;
  purchaseHistory: any[];
  additionalUserInfo: any;
}
