export class Order {
  id: string;
  customer: string;
  products: any;
  status: string;
  date: any;
  total: string;
  constructor(id: string, customer: string, products: any, status: string, date: any, total: string) {
    this.id = id;
    this.customer = customer;
    this.products = products;
    this.status = status;
    this.date = date;
    this.total = total;
  }
}
