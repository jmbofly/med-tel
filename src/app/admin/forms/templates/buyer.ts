export class Buyer {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  constructor(id: string, name: string, email: string, company: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.company = company;
    this.phone = phone;
  }
}
