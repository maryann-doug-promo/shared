"use server"

import { revalidatePath } from "next/cache";

// types
import { ReviewType } from "@/shared/types/review";

// DB functions
import { addReview, setApproval } from "@/shared/lib/db/review";

// zod schema
import { ApproveReviewSchema, LeaveReviewSchema } from "../_zodSchemas/review";

// actions
import { sendReviewEmail } from "./sendEmail";


export const leaveReviewAction = async (prevState: any, formData: any) => {

  try {
    const {
      first_name,
      last_name,
      rating,
      message
    } = LeaveReviewSchema.parse({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      rating: parseInt(formData.get("rating"), 10),
      message: formData.get("message")
    });

    const name = `${first_name} ${last_name.charAt(0)}.`;

    const newReview: ReviewType = await addReview({
      name,
      rating,
      message
    });

    await sendReviewEmail(newReview);

    return {
      message: "Your review has been submitted.",
      success: true
    }

  } catch (err) {
    console.error(err);
    return {
      message: "An error occurred. Please post your review again.",
      success: false
    }
  }
}

export const approveReviewAction = async (prevState: any, formData: any) => {

  try {

    const { review_id, approve } = ApproveReviewSchema.parse({
      review_id: parseInt(formData.get("review_id"), 10),
      approve: formData.get("approve") === 'true',
    })

    await setApproval(review_id, approve);

    // Revalidate the path for the reviews so
    // this new one will show up without having to rebuild the project
    revalidatePath(`/reviews`);

    return {
      message: `The review was marked as ${approve ? 'approved' : 'not approved'}.`,
      success: true
    }

  } catch (err) {
    console.error(err);
    return {
      message: "Your determination on the approval was not set. Please try again.",
      success: false
    }
  }

}