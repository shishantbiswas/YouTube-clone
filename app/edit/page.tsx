import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import EditComponent from "@/components/edit-component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit - YouTube Clone',
}
type Video =  {
  id: string;
  userId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;

}
export default async function Edit() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in?redirect_url=/edit')
  }
  const data = await db.video.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
    <h1 className="font-semibold text-3xl p-2">Edit</h1>
    <main className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
      {data.map((video:Video) => (
        <EditComponent video={video} key={video.id}/>
      ))}
    </main>
      </>
  );
}
