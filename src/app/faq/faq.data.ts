export class Faq {
  query?: string;
  keywords?: string[];
  answer?: FaqAnswer;
  show?: string;
  constructor(
    public theQuery?: string,
    public theKeywords?: string[],
    public theAnswer?: FaqAnswer,
    public theShow = 'hide'
  ) {
    this.query = theQuery;
    this.keywords = theKeywords;
    this.answer = theAnswer;
    this.show = theShow;
  }
  toggle() {
    this.show = this.show === 'hide' ? 'show' : 'hide';
  }
}

export interface FaqAnswer {
  content?: string;
  links?: string[];
  id?: string;
}

export const FAQS = [
  {
    query: 'Can I place an order by phone?',
    keywords: ['howto', 'services', 'purchase', 'phone'],
    answer: {
      content: `<b>Absolutely!</b> Please call us at 740-405-1633. We are avaialble Monday through Friday from 9 am to 5:30pm, EST`,
      links: ['contact'],
      id: '0001',
    },
  },
  {
    query: 'What products does MedTelPlus offer?',
    keywords: ['howto', 'catelog', 'products', 'medical-supplies'],
    answer: {
      content: `We are currently working on an online catelog that can be accessed on <a href="https://www.medtelplus.com" target="_blank" >medtelplus.com</a>. Because of demand and changes in the market, we must make adjustments to prices on our end. Keep in mind that we are not a company that hikes up prices. In this time of need, we are doing our best to help, and that means selling at as close to cost as possible, covering shipping and overhead. Nothing else.`,
      id: '0002',
    },
  },
  {
    query: 'How long will it take to recieve my order?',
    keywords: ['howto', 'contact', 'feedback', 'help'],
    answer: {
      content: `Currently we are having slightly longer shipping times due to the demand created by <a href="https://www.cdc.gov/coronavirus/2019-nCoV/index.html">COVID-19</a>. But we are working hard to cut shipping times to no longer than 10 days, based on the size of the order.`,
      id: '0003',
    },
  },
  {
    query: 'How do I get a refund?',
    keywords: ['howto', 'payments', 'refund', 'returns'],
    answer: {
      content: `Before returning any item, please contact us at 1-740-405-1633 to obtain the required Return Authorization (RA) Number.
At the time of issue of the RA number, our customer service representative will also give you the address of our returns department. Please DO NOT ship returns to our corporate headquarters! - All returns sent to that address will be automatically returned to the sender.Please read our return policy <a target="_blank" href="assets/return-policy.html">here</a>.`,
      links: ['contact'],
      id: '0004',
    },
  },
  {
    query: 'Payment Methods & Processing?',
    keywords: ['whatIs', 'wire-transfer','money-order', 'credit-card', 'payments', 'payment-methods', 'solutions', 'processing'],
    answer: {
      content: `We accept payments by wire-transfer, money-order, or credit card.<br> Before your first purchase, MedTelPlus requires a credit check. If there aren't any problems with the credit check, the buyer sends us a purchase order with the following information:<br>
      <ul class="unstyled-list">
      <li class="group-list-item">Date <em>[Date of purchase]</em></li>
      <li class="group-list-item">Name <em>[Your Name or Company Name]</em></li>
      <li class="group-list-item">Shipping Address <em>[Hospital or Company Address]</em></li>
      <li class="group-list-item">Contact email</li>
      <li class="group-list-item">Product Id <em>Make / Model / UID / SN</em></li>
      <li class="group-list-item">Quanity <em>Number of units to be purchased</em></li>
      <li class="group-list-item">Price <em>Purchase Total</em></li>
      </ul>If a sample is needed for inspection, we ship sample to the given shipping address, and await results. Once we get the okay, your order is filled and shipped within 24 hours.`,
      links: [
        'assets/return-policy.html',
      ],
      id: '0005',
    },
  },
  {
    query: 'Who does MedTelPlus sell to?',
    keywords: ['whatIs', 'ppe', 'medical-supplies', 'help', 'customers'],
    answer: {
      content: `At this time, due to COVID-19, we are prioritizing hospitals, State Governments, V.A. hospitals and clinics, as well as healthcare and public service workers.`,
      id: '0006',
    },
  },
  {
    query: 'Is there a purchase unit minimum?',
    keywords: ['whatIs', 'minimum', 'medical-supplies', 'help', 'purchasing'],
    answer: {
      content: `Because the demand is so high for many of the medical supplies we offer, especially PPE, we are asking that orders have a 10,000 unit minimum. However, we are willing to look at orders on a case-by-case basis, depending on need, location, and product availability`,
      id: '0007',
    },
  },
  {
    query: 'How can I find the latest COVID-19 data?',
    keywords: ['whatIs', 'covid-19', 'updates', 'help', 'api'],
    answer: {
      content: `We are monitoting data from a number of sources then make it available to our vistors. You can find COVID-19 updates for the United Staes <a href="//medtelplus.com/covid" target="_blank">here</a>`,
      id: '0008',
    },
  },
];
