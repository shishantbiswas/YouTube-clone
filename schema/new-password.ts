import { z } from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(3, {
      message: "Minimum of 3 characters required",
    }),
  });