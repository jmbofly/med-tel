export class Seller {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  products: any;
  constructor(id: string, name: string, email: string, company: string, products: any, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.company = company;
    this.products = products;
    this.phone = phone;
  }
}
