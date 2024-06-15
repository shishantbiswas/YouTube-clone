import UploadForm from "@/components/upload-form";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Upload - YouTube Clone',
}

export default async function UploadVideo() {

  const user = await validateRequest()

  if (!user.user) {
    redirect('/sign-in')
  }

  const verifiedUser = await db.user.findUnique({ where: { id: user.user?.id } })

  if(verifiedUser?.emailVerified===null){
    redirect('verify-email')
  }

  return (
    <UploadForm />
  );
}
