import Profile from "@/components/profile"
import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: 'Update Profile - YouTube Clone'
}

export default async function ProfilePage() {
    const user = await validateRequest()

    if (!user.user) {
        redirect('/sign-in')
    }

    const userInfo = await db.user.findUnique({ where: { id: user.user.id } })


    return (
        <main className="flex flex-col items-center justify-center  h-screen w-full">
            <Profile fullname={userInfo?.fullname} />
        </main>
    )
}