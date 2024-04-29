"use server"

// AWS SES
import ses from '../configureAWS';

// types
import { ReviewType } from '@/shared/types/review';
import { ContactType } from '@/shared/types/contact';

// email builder
import { getReviewEmail, getContactEmail } from '@/shared/lib/buildEmail';

const TO_EMAIL_ADDRESS: string = process.env.EMAIL_ADDRESS ? process.env.EMAIL_ADDRESS : '';
const FROM_EMAIL_ADDRESS: string = process.env.DEREKGYGAX_DOMAIN_EMAIL ? process.env.DEREKGYGAX_DOMAIN_EMAIL : '';

const sendEmail = (subject: string, html: string) => {
  const params = {
    Destination: {
      ToAddresses: [
        TO_EMAIL_ADDRESS,
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
    Source: `"${process.env.EMAIL_FROM_NAME}" <${FROM_EMAIL_ADDRESS}>`,
  };

  ses.sendEmail(params, function (err, data) {

    console.log(err);
    console.log(data);
    if (err) {
      console.error(err, err.stack);
      // TODO ADD THIS
      // res.status(500).json({ error: "Email failed to send." });
    }
    // else {
    //   console.log(data);
    //   // TODO ADD THIS!!
    //   // res.status(200).json({ success: "Email sent." });
    // }
  });

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
