"use server"

import moment from "moment";

// Take just digits and make it the standard way a phone number
// is displayed in the USA
export const formatPhoneNumber = (phoneNumber: string): string => {
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
}

export const getTimeAgo = (timePosted: Date) => {

  // review date time
  const reviewDate = moment(timePosted);

  // Get the current date/time
  const currentDate = moment();

  // Calculate the time difference
  const timeDifference = moment.duration(currentDate.diff(reviewDate));

  let number = 0;
  let word = '';

  if (Math.abs(timeDifference.asYears()) > 1) {
    number = Math.floor(Math.abs(timeDifference.asYears()));
    word = 'year';
  } else if (Math.abs(timeDifference.asMonths()) > 1) {
    number = Math.floor(Math.abs(timeDifference.asMonths()));
    word = 'month';
  } else if (Math.abs(timeDifference.asWeeks()) > 1) {
    number = Math.floor(Math.abs(timeDifference.asWeeks()));
    word = 'week';
  } else if (Math.abs(timeDifference.asDays()) > 1) {
    number = Math.floor(Math.abs(timeDifference.asDays()));
    word = 'day';
  } else {
    return `Submitted Today`;
  }
  if (number > 1) {
    word += "s"
  }
  return `${number} ${word} ago`;
}

export const isGoogleReCaptchaSafe = async (recaptcha: string): Promise<boolean> => {

  try {
    // Verifying the google recaptcha stuff
    // and the honey pots
    const googleReCaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`;
    const googleReCaptchaResponse = await fetch(googleReCaptchaVerificationUrl, {
      method: 'POST',
    });
    const googleRecaptchaData = await googleReCaptchaResponse.json();

    if (googleRecaptchaData.success && googleRecaptchaData.score && googleRecaptchaData.score > 0.5) {
      return true;
    } else {
      console.error("SPAM DETECTED: Check later for data on who did the spam.");
      console.error(`Google recaptcha: `);
      console.error(JSON.stringify(googleRecaptchaData));
      return false;
    }

  } catch (err) {
    console.error("An error occurred while checking the google captcha");
    console.error(err);
    return false;
  }
}