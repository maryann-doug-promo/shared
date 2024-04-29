
import { ReviewType } from "@/shared/types/review";

// content
import content from '../content/buildEmail.json';

// types
import { ContactType } from "@/shared/types/contact";

const HTML_THIS_WEBSITE = process.env.HTML_THIS_WEBSITE;

export const getReviewEmail = (review: ReviewType) => {

  return `<body>
    <div style="margin-left: 20px; margin-right: 20px;">
        <h3 style="margin-bottom: 20px;">A new review has been submitted</h3>
        <p>Please see the review at:</p>
        <a href="${HTML_THIS_WEBSITE}/${content.approveReviewUrl}/${review.approve_token}">New Review by ${review.reviewer_name}</a>
      </div>
  </body>`;
}

export const getContactEmail = (newContact: ContactType) => {


  const newRequestWorder = process.env.EMAIL_NEW_REQUEST_WORDING || "A new request has been submitted.";

  return `<body>
    <div style="margin-left: 20px; margin-right: 20px;">
      <h3 style="margin-bottom: 10px;">${newRequestWorder}</h3>
      <h4 style="margin-bottom: 10px;">See below for their details.</h4>
      <div style="margin-left: 10px;">
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; margin-right: 5px;">
            Name:
          </span>
          <span>${newContact.name}</span>
        </div>
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; margin-right: 5px;">
            Phone Number:
          </span>
          <span>${newContact.phone_number}</span>
        </div>
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; margin-right: 5px;">
            Email:
          </span>
          <span>${newContact.email}</span>
        </div>
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; margin-right: 5px;">
            Preferred Contact:
          </span>
          <span>${newContact.preferred_contact}</span>
        </div>
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; margin-right: 5px;">
            Address:
          </span>
          <span>${newContact.address}</span>
        </div>
        <div style="margin-bottom: 10px;">
          <p style="font-weight: bold;">
            Message:
          </p>
          <p style="margin-left: 10px; width: 600px;">
            ${newContact.message}
          </p>
        </div>
      </div>
    </div>
  </body>`;
}
