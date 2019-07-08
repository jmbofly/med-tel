export const DIVIDERS: Divider[] = [
  {
    title: `Don't wait till it's too late!`,
    text: `911 Help Now devices bring first
         responders right away. <br/>
         Fire, EMS and Police dispatched to you with
          empathy and accuracy.`,
    ctaLink: 'store',
    imageURL: 'assets/images/hour_glass.jpg',
    colors: {
      bgColor: 'bg-primary',
      title: 'text-black',
      text: `text-white`,
      cta: 'btn btn-outline-light',
    },
  },
  {
    title: 'You don\'t have to be afraid anymore',
    text: `MedTelPlus cares about your well-being, our qualified dispatchers are patient and kind.`,
    ctaLink: 'store',
    colors: {
      bgColor: 'bg-white',
      title: 'text-primary',
      text: `text-black`,
      cta: `btn btn-outline-dark`,
    },
  },
  {
    title: 'Just the push of a button away',
    text: `Get life-saving 911 Help Now devices, and find out what fast and reliable really means.`,
    ctaLink: 'store',
    imageURL: 'assets/images/911HN_button_push.JPG',
    colors: {
      bgColor: 'bg-default',
      title: 'text-primary',
      text: `text-black`,
      cta: `btn btn-outline-dark`,
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
