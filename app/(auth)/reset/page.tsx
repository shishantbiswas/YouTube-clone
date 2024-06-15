import ResetPage from "@/components/auth/reset";
import { validateRequest } from "@/lib/auth";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Reset Password - YouTube Clone'
}
export default async function Reset() {

    const user = await validateRequest()

    if (user.user) {
      redirect('/')
    }
  
    return (
        <main className=" flex items-center justify-center h-full">
            <ResetPage />
        </main>
    )
}