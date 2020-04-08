export const DIVIDERS: Divider[] = [
  {
    title: `PPE & More`,
    text: `All over the world, healthcare workers, and public servants are putting their lives on the line to help keep others healthy and safe. They do not have the protective equipment that is essential. Our goal is to remedy this.<br>
    A direct connection to manufacturers ensures that we can pass the time and savings on to our customers.`,
    ctaLink: 'contact',
    imageURL: 'assets/images/divider/n95.jpg',
    colors: {
      bgColor: 'bg-primary',
      title: 'text-dark',
      text: `text-white`,
      cta: 'btn btn-outline-dark',
    },
  },
  {
    title: 'Telemedicine: Coming Soon!',
    text: `MedTelPlus cares about your well-being, and we are working hard to complete a telecare platform that offers real doctors available 24/7, with highly trained associates ready to listen with empathy, and respond quickly without all of the unnecessary and expensive reactions that most patients have experienced when needing medical care.`,
    ctaLink: 'contact',
    colors: {
      bgColor: 'bg-white',
      title: 'text-secondary',
      text: `text-black`,
      cta: `btn btn-outline-secondary`,
    },
  },
  {
    title: 'Where We Came From',
    text: `MedTelPlus is a division of Global Technology Services LLC.<br> A company that specializes in the research & development of technology built to enhance or replace products and solutions in several industries with high-quality results, and meeting all expectations.`,
    ctaLink: 'about',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/gts-site-80a8a.appspot.com/o/img%2Fgts_logo_alt_short_2.png?alt=media&token=137c99b9-6dd2-443e-933c-ae29c15198be',
    colors: {
      bgColor: 'bg-gray',
      title: 'text-light',
      text: `text-dark`,
      cta: `btn btn-outline-light`,
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
