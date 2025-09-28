// src/schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password:z.string().min(6,{message:"password must be atleast 6 characters"})
});

// Extended schema for server-side validation
export const loginWithTurnstileSchema = loginSchema.extend({
  turnstileToken: z.string().min(1, "Captcha verification is required"),
});