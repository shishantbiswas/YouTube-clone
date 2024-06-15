"use server";

import { resetSchema } from "@/schema/reset";
import { z } from "zod";
import { redirect } from "next/navigation";
import { sendPasswordResetEmail } from "@/lib/resend";
import { generatePasswordResetToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";

export default async function Reset(values: z.infer<typeof resetSchema>) {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {success:'Password Reset email send !'}
}
