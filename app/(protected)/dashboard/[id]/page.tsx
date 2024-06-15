import UpdateForm from "@/components/update-form";
import { validateRequest } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Update Info - YouTube Clone',
}

export default async function Edit() {
 
  const user = await validateRequest()

  if (!user.user) {
    redirect('/sign-in')
  }

  return (
   <UpdateForm/>
  );
}
