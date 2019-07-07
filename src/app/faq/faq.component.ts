import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FaqService } from './faq.service';
import { FAQS, Faq } from './faq.data';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faqList: Faq[];
  searchParts: string[];
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public faqService: FaqService
  ) {}

  ngOnInit() {
    this.faqList = FAQS.map(
      item => new Faq(item.query, item.keywords, item.answer, 'hide')
    );
  }

  filterFaqList(
    filterBy = 'keywords',
    query: string[],
    inputList: Faq[] = this.faqList,
    outputList: Faq[]
  ) {
    console.log('faqs', inputList);
  }

  navigateTo(url: string, params = null) {
    return this.router.navigateByUrl(url);
  }

  toggleFaqContainer(idx: number) {
    this.faqList.map(faq => (faq.show = 'hide'));
    this.faqList[idx].toggle();
  }
}
