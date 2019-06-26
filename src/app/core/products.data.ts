export interface Product {
  additionalInformation?: string;
  productId?: string;
  category?: string[];
  productName?: string;
  imgUrl?: string;
  imageList?: ProductImage[];
  caption?: string;
  description?: string;
  options?: ProductOptions;
  price?: number;
  reviews?: ProductReview[];
  tags?: string[];
}

export class ProductImage {
  src?: string;
  caption?: string;
  title?: string;
  alt?: string;
  size?: { height: number; width: number };
  keywords?: string[];
}

export interface ProductReview {
  name?: string;
  date?: Date;
  text?: string;
  stars?: number;
}

export interface ProductOptions {
  colors?: string[];
  sizes?: string;
  packages?: any;
  quantity?: number;
}

export class Coupon {
  couponCode?: string;
  expiresOn?: number;
  discountAmount?: number;
}

export class Cart {
  coupon?: Coupon;
  items?: string[];
  total?: number;
  tax?: number;
  readyForCheckout?: boolean;
}

export const COUPONS: Coupon[] = [
         {
           couponCode: 'VET',
           expiresOn: new Date().setDate(new Date().getDate() - 30),
           discountAmount: 5,
         },
         {
           couponCode: 'NEWACCOUNT',
           expiresOn: new Date().setDate(new Date().getDate() - 30),
           discountAmount: 10,
         },
       ];

export const Products: Product[] = [
         {
           imgUrl: 'assets/images/911HN_buttonclipcover_01_540x.jpg',
           caption: 'Replacement Clip Cover',
           price: 5.99,
           productId: '0001',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: 'Clip Cover',
           tags: ['sale'],
           category: ['accessories'],
         },
         {
           imgUrl: 'assets/images/911HN_buttoncover_01_540x.jpg',
           caption: 'Replacement Battery Cover',
           price: 5.99,
           productId: '0002',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: 'Battery Cover',
           tags: ['sale'],
           category: ['accessories', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/911HN_01_500x500.jpg',
           caption: '911 Help Now Button',
           price: 79.99,
           productId: '0003',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: '911 Help Now Alert Button',
           tags: ['sale'],
           category: ['devices', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/911helpnow_front2units_540x.jpg',
           caption: '2 911 Help Now Buttons Package',
           price: 125.99,
           productId: '0004',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: '2 for One 911 Help Now Buttons',
           tags: ['new'],
           category: ['devices', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/911helpnow_lanyard_540x.jpg',
           caption: 'Replacement Lanyard',
           price: 5.99,
           productId: '0005',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: 'Lanyard',
           tags: ['sale'],
           category: ['accessories', 'devices', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/replacement_button_guard_540x.jpg',
           caption: 'Replacement Button Guard',
           price: 4.99,
           productId: '0006',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: 'Button Guard',
           tags: ['new'],
           category: ['accessories', 'devices', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/smartgo_BLK_front_shadow_500x.png',
           caption: `SmartGo Personal Alert Device`,
           price: 45.99,
           productId: '0007',
           description: `Fusce ornare mi vel risus
      porttitor dignissim. Nunc eget risus at
      ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
      a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             colors: ['black', 'blue'],
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: 'Smartgo Personal Alert Device',
           tags: ['new'],
           category: ['devices', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/smartgo_BLK_watersplash_large_cropped.png',
           caption: `2 SmartGo Personal Alert Devices`,
           price: 85.99,
           productId: '0008',
           description: `Fusce ornare mi vel risus
              porttitor dignissim. Nunc eget risus at
              ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
              a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             colors: ['black', 'blue'],
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: '',
           tags: ['soldout'],
           category: ['devices', 'telemedicine'],
         },
         {
           imgUrl: 'assets/images/smartgo_BLUE_dock_large_cropped.png',
           caption: `SmartGo Personal Alert Device Charging Dock`,
           price: 35.99,
           productId: '0009',
           description: `Fusce ornare mi vel risus
              porttitor dignissim. Nunc eget risus at
              ipsum blandit ornare vel sed velit. Proin gravida arcu nisl,
              a dignissim mauris placerat`,
           reviews: [
             {
               name: 'joe schmoe',
               text: 'such a great product!',
               stars: 3,
             },
           ],
           options: {
             packages: 'Ask about effective packages.',
             quantity: 1,
           },
           additionalInformation:
             'No additional information at this time.',
           productName: '',
           tags: ['new'],
           category: ['devices', 'telemedicine'],
         },
       ];
