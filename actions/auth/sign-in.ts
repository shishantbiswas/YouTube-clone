"use server";

import { signInSchema } from "@/schema/sign-in";
import { z } from "zod";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function (values: z.infer<typeof signInSchema>) {
  const validatedField = signInSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Form Validation Failed" };
  }

  const { password, username } = validatedField.data;

  const existingUser = await db.user.findFirst({
    where: { username: username },
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const correctPassowrd = bcrypt.compareSync(
    password,
    existingUser.hashedPassword
  );

  if (!correctPassowrd) {
    return {
      error: "Incorrect username or password",
    };
  }

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {success:'Sign In Successfull'}
}
