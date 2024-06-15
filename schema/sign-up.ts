import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .refine((value) => /^[a-z0-9_-]+$/.test(value), {
      message:
        "Only lowercase letters, digits, underscores, or hyphens are allowed.",
    }),
  email: z
    .string()
    .email("This is not a valid email."),
  password: z.string(),
});
