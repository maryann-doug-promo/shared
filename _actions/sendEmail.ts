"use server"

// NODE MAILER
const nodemailer = require("nodemailer");

// types
import { ReviewType } from '@/shared/types/review';
import { ContactType } from '@/shared/types/contact';

// email builder
import { getReviewEmail, getContactEmail } from '@/shared/lib/buildEmail';

const TO_EMAIL_ADDRESS: string = process.env.EMAIL_ADDRESS ? process.env.EMAIL_ADDRESS : '';
const FROM_EMAIL_ADDRESS: string = process.env.DEREKGYGAX_DOMAIN_EMAIL ? process.env.DEREKGYGAX_DOMAIN_EMAIL : '';

interface SendError extends Error {
  code?: string;
}

// TODO YOU STILL CANNOT SET UP EMAILS!!!
// YOU NEED TO GET A WAY THAT DOES THAT STILL!!!
// BUT FIRST DEVELOPE THE SITES!!!


// NODE MAILER
const getTransporter = () => {
  // This is the stuff for your private domain
  // derekgygax.com
  // you have a private email
  //  services@derekgygax.com
  return nodemailer.createTransport({
    host: 'mail.privateemail.com', // The SMTP server host from Namecheap
    port: 587, // Port for TLS/STARTTLS
    secure: false, // True for 465, false for other ports like 587
    auth: {
      user: process.env.DEREKGYGAX_DOMAIN_EMAIL,
      pass: process.env.DEREKGYGAX_DOMAIN_PASSWORD,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
    }
  });
}

const sendEmail = (subject: string, html: string) => {
  const transporter = getTransporter();

  transporter.sendMail(
    {
      to: TO_EMAIL_ADDRESS,
      from: `"${process.env.EMAIL_FROM_NAME}" ${FROM_EMAIL_ADDRESS}`,
      subject: subject,
      html: html,
    },
    (error: SendError | null, info: any) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );
}

export const sendReviewEmail = async (newReview: ReviewType) => {

  const subject = 'Approve a Review';
  const emailHtml = getReviewEmail(newReview);

  sendEmail(subject, emailHtml);

}

export const sendContactEmail = async (newContact: ContactType) => {

  const subject = process.env.NEW_REQUEST_EMAIL_SUBJECT || "New Request";
  const emailHtml = getContactEmail(newContact);

  sendEmail(subject, emailHtml);
}
