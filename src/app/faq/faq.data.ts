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
    query: 'How do I purchase MedTelPlus services?',
    keywords: ['howto', 'services', 'purchase'],
    answer: {
      content: `<ul class="list-group">
              <li class="list-group-item">Navigate to Store page</li>
              <li class="list-group-item">Select Services in Categories</li>
              <li class="list-group-item">Find the service you need, and click ADD TO CART</li>
              <li class="list-group-item">Continue shopping or go to checkout</li>
            </ul>`,
      links: ['store'],
      id: '0001',
    },
  },
  {
    query: 'How do I activate my 911HelpNow alert device?',
    keywords: ['howto', 'activation', '911HelpNow', 'devices'],
    answer: {
      content: `<ul class="list-group">
              <li class="list-group-item">Simple. There is no activation required on the basic 911HelpNow alert devices.</li>
            </ul>`,
      id: '0002',
    },
  },
  {
    query: 'How do I contact MedTelPlus?',
    keywords: ['howto', 'contact', 'feedback', 'help'],
    answer: {
      content: `<ul class="list-group">
              <li class="list-group-item">Navigate to Contact page</li>
              <li class="list-group-item">Enter required info into form fields</li>
              <li class="list-group-item">Click SEND MESSAGE</li>
            </ul> <br/>
            <h4>Alternative</h4>
            <ul class="list-group">
              <li class="list-group-item">Call toll-free 1.844.879.4788</li>
            </ul> <br/>
            <ul class="list-group">
              <li class="list-group-item">Email MedTelPlus at info@medtelplus.com</li>
            </ul>`,
      id: '0003',
    },
  },
  {
    query: 'How do I get a refund?',
    keywords: ['howto', 'payments', 'refund', 'returns'],
    answer: {
      content: `<ul class="list-group">
              <li class="list-group-item">For any issues with products or services,
             call toll-free 1.844.879.4788, or email MedTelPlus at
             info@medtelplus.com.</li>
            </ul>`,
      links: ['contact'],
      id: '0004',
    },
  },
  {
    query: 'What is CGX and cancer screening?',
    keywords: ['whatIs', 'cgx', 'cancer-screening', 'services'],
    answer: {
      content: `<ul class="list-group">
              <li class="list-group-item">
              CGX is an easy and fast test for finding genetic
               markers that put you at risk of having cancer</li>
            </ul>`,
      links: [
        'https://www.cancer.gov/about-cancer/causes-prevention/genetics/genetic-testing-fact-sheet',
      ],
      id: '0004',
    },
  },
];
