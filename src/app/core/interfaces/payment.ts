export interface Payment {
  email?: string;
  name?: any;
  address?: any;
  id?: string;
  amount?: string;
  product?: string;
  timestamp?: string;
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
