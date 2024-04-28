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