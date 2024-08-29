import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().max(100),
  phone_number: z.string().max(20),
  email: z.string().max(100),
  preferred_contact: z.string().max(50),
  address: z.string().max(100),
  message: z.string().max(2000),
  // NOTE: honeypot
  // These are NOT real!! and hidden. They are there to prevent bots and spam
  age: z.string(),
  height: z.string(),
  shoeSize: z.string()
});