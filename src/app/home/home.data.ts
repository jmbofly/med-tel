export const DIVIDERS: Divider[] = [
  {
    title: `MedTelPlus Crate Subscriptions`,
    text: `Every month brings a new crate filled with our favorite CBD items delivered to your doorstep. <br/>
         The perfect gift for friends and family, but don't forget to treat yourself!`,
    ctaLink: 'store',
    imageURL: 'assets/images/masthead/masthead-bg_1@2x.jpg',
    colors: {
      bgColor: 'bg-primary',
      title: 'text-black',
      text: `text-white`,
      cta: 'btn btn-outline-light',
    },
  },
  {
    title: 'Telemedicine platform coming soon!',
    text: `MedTelPlus cares about your well-being, and we are working hard to complete a telecare platform that offers real doctors available 24/7, with highly trained associates ready to listen with empathy, and respond quickly without all of the unnecessary and expensive reactions that most patients have experienced when needing medical care.`,
    ctaLink: 'store',
    colors: {
      bgColor: 'bg-white',
      title: 'text-primary',
      text: `text-black`,
      cta: `btn btn-outline-dark`,
    },
  },
  {
    title: 'Lose frusteration...not money',
    text: `MedTelPlus is a division of Global Technology Services, LLC. A company that specializes in the research & development of technology designed to enhance or replace products and services in several industries with the sole purpose of meeting top-shelf qaulity expectations, at a price that can fit every budget.`,
    ctaLink: 'store',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/gts-site-80a8a.appspot.com/o/img%2Fgts_logo_alt_short_2.png?alt=media&token=137c99b9-6dd2-443e-933c-ae29c15198be',
    colors: {
      bgColor: 'bg-dark',
      title: 'text-primary',
      text: `text-light`,
      cta: `btn btn-outline-white`,
    },
  },
];

export class Divider {
  title?: string;
  icon?: string;
  imageURL?: string;
  text?: string;
  ctaLink?: string;
  colors?: DividerColors;
}

export interface DividerColors {
  bgColor: string;
  title: string;
  text: string;
  cta?: string;
}
