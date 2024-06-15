"use server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { signUpSchema } from "@/schema/sign-up";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/resend";

export default async function SignUp(values: z.infer<typeof signUpSchema>) {
  const validatedField = signUpSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Form Validation Failed" };
  }

  const { username, password, email } = validatedField.data;

  const existingUser = await db.user.findFirst({
    where: { email: email },
  });

  const existingUsername = await db.user.findUnique({
    where: { username: username },
  });

  if (existingUser ) {
    return { error: "Email Already Exists" };
  }
  if (existingUsername ) {
    return { error: "Username was Taken" };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const userId = generateIdFromEntropySize(10);

  await db.user.create({
    data: {
      id: userId,
      username,
      email,
      hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect(`/verify-email`)
}
