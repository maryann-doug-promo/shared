import { z } from "zod";

export const LeaveReviewSchema = z.object({
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  rating: z.number(),
  message: z.string().max(2000)
});

export const ApproveReviewSchema = z.object({
  review_id: z.number(),
  approve: z.boolean()
});