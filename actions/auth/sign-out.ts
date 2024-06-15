'use server'
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export default async function SignOut(){
	
	
	const { session } = await validateRequest();
	
	if (!session) {
		return {
			error: "Unauthorized"
		};
		}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return {success : 'Signed Out Successfully'}
}