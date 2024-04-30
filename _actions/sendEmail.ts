"use server"

// NODE MAILER
const nodemailer = require("nodemailer");

// AWS SES
import ses from '../configureAWS';

// types
import { ReviewType } from '@/shared/types/review';
import { ContactType } from '@/shared/types/contact';

// email builder
import { getReviewEmail, getContactEmail } from '@/shared/lib/buildEmail';

const sendEmail = (subject: string, html: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: [
          process.env.EMAIL_RECEIVING ?? '',
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_SENDING ?? ''}>`,
    };

    ses.sendEmail(params, function (err, data) {
      if (err) {
        console.log(err);
        resolve(JSON.stringify(err));
      } else {
        console.log(data);
        resolve(JSON.stringify(data));
      }
    });
  });
}

export const sendReviewEmail = async (newReview: ReviewType) => {

  const subject = 'Approve a Review';
  const emailHtml = getReviewEmail(newReview);

  return await sendEmail(subject, emailHtml);

}

export const sendContactEmail = async (newContact: ContactType): Promise<string> => {

  const subject = process.env.NEW_REQUEST_EMAIL_SUBJECT || "New Request";
  const emailHtml = getContactEmail(newContact);

  return await sendEmail(subject, emailHtml);
}