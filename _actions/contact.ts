"use server"


// types
import { ContactType } from "@/shared/types/contact";

// zod schema
import { ContactSchema } from "../_zodSchemas/contact";

// actions
import { sendContactEmail } from "./sendEmail";


// This is going to send an email to Mary so she can approve the review
export const contactAction = async (prevState: any, formData: any) => {
  let happened: string = "";
  try {

    const contact: ContactType = ContactSchema.parse({
      name: formData.get("name"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      preferred_contact: formData.get("preferred_contact"),
      address: formData.get("address"),
      message: formData.get("message")
    })

    happened = await sendContactEmail(contact);

    return {
      message: [
        "Your request has been sent.",
        "You will be contacted soon!",
        happened
      ],
      success: true
    }

  } catch (err) {
    console.error(err);
    return {
      message: [
        "An error occurred while sending the request.",
        "Please try again.",
        happened
      ],
      success: false
    }
  }
}