import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp(functions.config().firebase);
const mainEmail = functions.config().main.email;
const mainPassword = functions.config().main.password;
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

exports.sendNewContactEmail = functions.firestore
  .document(`contacts/{contactId}`)
  .onCreate((snap, context) => {
    const resource = context.resource;
    const contact: any = snap.data();
    if (snap.exists) {
      return sendWelcomeToContact(contact.email, contact.name, contact.subject);
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
  const mailOptions: any = {
    from: `"MedTelPlus" info@medtelplus.com`,
    to: email,
  };

  // The user sent a contact form.
  mailOptions.subject = `Thanks for contacting ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName}! Welcome to ${APP_NAME}. We are responding to your inquiry about ${subject}. `;
  await mailTransport.sendMail(mailOptions);
  console.log('New contact email sent to:', email);
  return null;
}

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.firestore
  .document(`users/{userId}`)
  .onCreate((snap, context) => {
    const resource = context.resource;
    const user: any = snap.data();
    if (snap.exists) {
      return sendWelcomeEmail(user.email, user.username);
    } else {
      console.log(`failed to send contact email on ${resource}`, snap, context);
      return null;
    }
  });
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.firestore
  .document(`users/{userId}`)
  .onDelete((snap, context) => {
    const resource = context.resource;
    const user: any = snap.data();
    if (snap.exists) {
      return sendGoodbyeEmail(user.email, user.username);
    } else {
      console.log(`failed to send contact email on ${resource}`, snap, context);
      return null;
    }
  });
// [END sendByeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email?: string, displayName?: string) {
  const mailOptions: any = {
    from: `info@medtelplus.com`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName ||
    ''}! Welcome to ${APP_NAME}. We hope you will enjoy our service.`;
  await mailTransport.sendMail(mailOptions).then(response => {
    response.json();
  });
  console.log('New welcome email sent to:', email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email?: string, displayName?: string) {
  const mailOptions: any = {
    from: `info@medtelplus.com`,
    to: email,
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${displayName ||
    ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  console.log('Account deletion confirmation email sent to:', email);
  return null;
}
