"use server"


// types
import { ContactType } from "@/shared/types/contact";

// zod schema
import { ContactSchema } from "../_zodSchemas/contact";

// actions
import { sendContactEmail } from "./sendEmail";

// utils
import { isGoogleReCaptchaSafe } from "../lib/utils";


// This is going to send an email to Mary so she can approve the review
export const contactAction = async (prevState: any, formData: any) => {
  try {

    // recaptcha by google for bots
    const recaptcha = formData.get("recaptcha");

    const contact: ContactType = ContactSchema.parse({
      name: formData.get("name"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      preferred_contact: formData.get("preferred_contact"),
      address: formData.get("address"),
      message: formData.get("message"),
      // REMEMBER: these are just for honeypotting to block bots
      // NOT REAL
      age: formData.get("age"),
      height: formData.get("height"),
      shoeSize: formData.get("shoe_size")
    });


    // Verifying the google recaptcha stuff
    // and the honey pots
    const googleRecaptchaIsSafe = await isGoogleReCaptchaSafe(recaptcha);
    if (
      googleRecaptchaIsSafe
      && contact.age === (process.env.NEXT_PUBLIC_HONEY_POT_AGE ?? "")
      && contact.height === ""
      && contact.shoeSize === ""
    ) {
      await sendContactEmail(contact);
    } else {
      console.error("Spam detected:");
      console.error(JSON.stringify(contact));
    }

    return {
      message: [
        "Your request has been sent.",
        "You will be contacted soon!"
      ],
      success: true
    }

  } catch (err) {
    console.error(err);
    return {
      message: [
        "An error occurred while sending the request.",
        "Please try again."
      ],
      success: false
    }
  }
}