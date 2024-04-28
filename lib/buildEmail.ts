
import { ReviewType } from "@/shared/types/review";

// content
import content from '../content/buildEmail.json';

// types
import { ContactType } from "@/shared/types/contact";

const HTML_THIS_WEBSITE = process.env.HTML_THIS_WEBSITE;

const BASE = `
<html lang="en">
<head>
  <meta charSet="utf-8" />
  <title>The HTML5 Herald</title>
  <meta name="description" content="The HTML5 Herald" />
  <meta name="author" content="SitePoint" />
  <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
{BODY}
</html>
`;

export const getReviewEmail = (review: ReviewType) => {

  const body = `<body>
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>A new review has been submitted</h3>
        <p>Please see the review at:</p>
        <a href="${HTML_THIS_WEBSITE}/${content.approveReviewUrl}/${review.approve_token}">New Review by ${review.reviewer_name}</a>
      </div>
  </body>`;

  return BASE.replace('{BODY}', body);
}

export const getContactEmail = (newContact: ContactType) => {


  const newRequestWorder = process.env.EMAIL_NEW_REQUEST_WORDING || "A new request has been submitted.";

  const body = `<body>
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <h3 style={{ marginBottom: '10px' }}>${newRequestWorder}</h3>
      <h4 style={{ marginBottom: '10px' }}>See below for their details.</h4>
      <div style={{ marginLeft: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
            Name:
          </span>
          <span>${newContact.name}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
            Phone Number:
          </span>
          <span>${newContact.phone_number}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
            Email:
          </span>
          <span>${newContact.email}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
            Preferred Contact:
          </span>
          <span>${newContact.preferred_contact}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
            Address:
          </span>
          <span>${newContact.address}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <p style={{ fontWeight: 'bold' }}>
            Message:
          </p>
          <p style={{ marginLeft: '10px', width: '600px' }}>
            ${newContact.message}
          </p>
        </div>
      </div>
    </div>
  </body>`;

  return BASE.replace('{BODY}', body);
}
