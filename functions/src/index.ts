import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
// import {Mailer} from './mailer';
import { newsletterTemplate as template } from './email.constant';

admin.initializeApp(functions.config().firebase);
const mainEmail: any = functions.config().main.email;
const mainPassword: any = functions.config().main.password;
const mailTransport: nodemailer.Transporter = nodemailer.createTransport({
  name: 'medtelplus.com',
  host: 'gator3234.hostgator.com',
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
 * method for sending transaction data (invoice) email
 */
exports.sendNewTransactionToVendor = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate((snap, context) => {
    let transaction: any;
    if (snap.exists) {
      transaction = snap.data();
      return sendNewTransactionToVendor(transaction).then(() =>
        sendNewTransactionToAdmin(transaction).then(() =>
          sendAdminNotice({ ...transaction, type: 'Transaction' })
        )
      );
    } else {
      return null;
    }
  });

async function sendNewTransactionToAdmin(transaction: any) {
  const locals: any = {};
  locals.address = transaction.order.order
    ? JSON.stringify(transaction.order.order.address)
    : JSON.stringify(transaction.order.address);
  locals.list = transaction.order.items
    .map((item: any) => item.productName)
    .map((val: string, idx: number) =>
      idx === 0
        ? `Products to be filled and shipped: <br/>1. ${val}`
        : `<br/>${idx + 1}. ${val}`
    );
  const mailOptions: nodemailer.SendMailOptions = {
    from: `"MedTelPlus ECommerce Fullfilment Service." info@medtelplus.com`,
    to: 'jimi@medtelplus.com',
    cc: [
      /* 'evantsirlin@gmail.com',
      'kevin@medtelplus.com', */
    ],
    subject: 'TEST-----New Order Placed-----TEST',
  };

  await mailTransport.sendMail(mailOptions);
  console.log('New transaction email sent to vendor');
  return null;
}

async function sendNewTransactionToVendor(transaction: any) {
  const address: string = transaction.order.order
    ? JSON.stringify(transaction.order.order.address)
    : JSON.stringify(transaction.order.address);
  const list: string[] = transaction.order.items
    .map((item: any) => item.productName)
    .map((val: string, idx: number) =>
      idx === 0
        ? `Products to be filled and shipped: <br/>1. ${val}`
        : `<br/>${idx + 1}. ${val}`
    );
  const mailOptions: nodemailer.SendMailOptions = {
    from: `"MedTelPlus ECommerce." info@medtelplus.com`,
    to: 'jimi@medtelplus.com',
    cc: [
      /* 'evantsirlin@gmail.com',
      'kevin@medtelplus.com', */
    ],
    subject: 'TEST-----New Order Placed-----TEST',
    html: `<h3>TEST_-_-_-_-_The following Items have been ordered and need fullfilled/shipped: _-_-_-_-_TEST</h3>
            <p>${list}</p>
            <h3>Shipping Address :</h3>
            <p>${address}</p>`,
  };
  await mailTransport.sendMail(mailOptions).then(onSuccess => {
    console.log('New transaction email sent to vendor: ', onSuccess);
    return transaction;
  });
}

/**
 * method for sending email to subscriber
 */
exports.sendNewsletterToSubscriber = functions.firestore
  .document(`subscribers/{subscriberId}`)
  .onCreate((snap, context) => {
    let user: any;
    if (snap.exists) {
      user = snap.data();
      return sendNewSubscriberEmail(user.email).then(() =>
        sendAdminNotice({ ...user, type: 'Subscriber' })
      );
    } else {
      return null;
    }
  });

async function sendNewSubscriberEmail(email: string) {
  const mailOptions: nodemailer.SendMailOptions = {
    from: `"MedTelPlus" info@medtelplus.com`,
    to: email,
    attachments: [
      {
        path: `https://medtelplus.com/assets/images/logo_full.png`,
        filename: 'logo_full.png',
      },
      {
        path: `https://medtelplus.com/assets/images/about-bg.jpg`,
        filename: 'about-bg.jpg',
      },
    ],
    html: template,
  };

  // The user sent a contact form.
  mailOptions.subject = `Thanks for subscribeing to the ${APP_NAME} newsletter!`;
  mailOptions.text = `Hey! Thanks for subscribing! Keep an eye out for your monthly newsletter with tons of great content.`;
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
      ).then(() => sendAdminNotice({ ...contact, type: 'Contact' }));
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
    to: email,
    html: template,
    attachments: [
      {
        path: `https://medtelplus.com/assets/images/about-bg.jpg`,
        filename: 'about-bg.jpg',
      },
    ],
  };

  // The user sent a contact form.
  mailOptions.subject = `Thanks for contacting ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName}! Welcome to ${APP_NAME}. We are responding to your inquiry about ${subject}. `;
  await mailTransport.sendMail(mailOptions);
  console.log('New contact email sent to:', email);
  return null;
}

async function sendAdminNotice(message?: any) {
  const type = message.type;
  const keys = Object.keys(message);
  const body: any = keys.map(val => Object.create(message[val]));
  const mailOptions: nodemailer.SendMailOptions = {
    from: `info@medtelplus.com`,
    to: 'jimi@medtelplus.com',
  };

  // The notice type.
  mailOptions.subject = `New ${type || 'Notification'} added to ${APP_NAME} DB`;
  mailOptions.text = JSON.stringify(body);
  await mailTransport.sendMail(mailOptions);
  console.log('New Notice');
  return null;
}
