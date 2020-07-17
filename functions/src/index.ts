import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
// import {Mailer} from './mailer';
// import { newsletterTemplate as template } from './email.constant';

admin.initializeApp(functions.config().firebase);
const mainEmail: any = functions.config().main.email;
const mainPassword: any = functions.config().main.password;
const mailTransport: nodemailer.Transporter = nodemailer.createTransport({
  name: 'medtelplus.com',
  host: 'smtp.zoho.com',
  service: 'Zoho',
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: mainEmail,
    pass: mainPassword,
  },
});

// Company name to include in the emails
const APP_NAME = 'MedTelPlus';
/**
 * method for sending email to subscriber
 */
exports.sendNewsletterToSubscriber = functions.firestore
  .document(`subscribers/{subscriberId}`)
  .onCreate((snap, context) => {
    let user: any;
    if (snap.exists) {
      user = snap.data();
      return sendNewSubscriberEmail(user.email)
        .then(res => console.log(res))
        .catch(err => console.log('error subscribing user', err));
    } else {
      return null;
    }
  });

async function sendNewSubscriberEmail(email: string) {
  const mailOptions: nodemailer.SendMailOptions = {
    from: `"MedTelPlus" info@medtelplus.com`,
    to: email
  };

  // The user sent a contact form.
  mailOptions.subject = `Thanks for subscribing to ${APP_NAME} updates!`;
  mailOptions.text = `Hey! Thanks for subscribing! Keep an eye out for updates on our products and solutions for all of your healthcare needs.\n\n In these troubling times, our job is to help protect those working on the frontlines. Whether they are healthcare workers, first responders and police, or public servants providing neccesary services. Our goal is to make sure they are equipped with the proper PPE, and medical supplies.\n\n We partner with dozens of other suppliers as well as having a direct relationship with several manufacturers. This gives us the opportunity to help communities all over the country. \n\nWe sincerely care about our fellow human beings, and believe it's our responsibility to lead by example. Price-gouging and profiteering are rampant, and countless companies are taking advantage of those effected by the COVID-19 pandemic.\n\n Enough is enough! If you know of a business, or individual who is using the pandemic to extort or are selling PPE and other products above a reasonable price, report them to either your local officials, or the Attorney General for you state.`;
  await mailTransport.sendMail(mailOptions);
  console.log('New contact email sent to:', email);
  return null;
}

exports.sendNewContactEmail = functions.firestore
  .document(`contacts/{contactId}`)
  .onCreate((snap, context) => {
    const resource = context.resource;
    const contact: any = snap.data();
    if (snap.exists) {
      return sendWelcomeToContact(
        contact.email,
        contact.name,
        contact.subject
      ).then(res => console.log(res))
        .catch(err => console.log('error adding contact', err));
    } else {
      console.log(`failed to send contact email on ${resource}`, snap, context);
      return null;
    }
  });

// Sends a welcome email to the new contact.
async function sendWelcomeToContact(
  email?: string,
  displayName?: string,
  subject?: string
) {
  const mailOptions: nodemailer.SendMailOptions = {
    from: `"MedTelPlus" info@medtelplus.com`,
    to: email
  };

  // The user sent a contact form.
  mailOptions.subject = `Thanks for contacting ${APP_NAME}!`;
  mailOptions.text = `Hey! Thanks for contacting us! Our customers are very important to us, and in these troubling times, it's more important than ever to stay informed. One of our friendly representatives will contact you as soon as possible. Thank you for your interest in ${APP_NAME}`;
  await mailTransport.sendMail(mailOptions);
  console.log('New contact email sent to:', email);
  return null;
}
