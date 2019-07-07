import { Injectable } from '@angular/core';
import { FAQS, Faq } from './faq.data';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor() {}

  getFaqList() {
    return FAQS.map(item => new Faq(item.query, item.keywords, item.answer));
  }
}
