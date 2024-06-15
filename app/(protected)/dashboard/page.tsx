import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import EditComponent from "@/components/edit-component";
import { Metadata } from "next";
import { validateRequest } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Edit - YouTube Clone',
}

export default async function Edit() {
  const userId = await validateRequest()

  if (!userId.user) {
    redirect('/sign-in')
  }
  const data = await db.video.findMany({
    where: {
      userId: userId.user?.id,
    },
  });

  return (
    <div >
    <h1 className="font-semibold text-3xl p-4">Your Dashboard</h1>
    <main className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-3 md:m-5 ">
      {data.map((video) => (
        <EditComponent video={video} key={video.id}/>
      ))}
    </main>
      </div>
  );
}
