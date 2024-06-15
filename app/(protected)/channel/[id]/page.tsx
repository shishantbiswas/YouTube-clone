import VideoArrayFallback from "@/components/fallback-ui/video-array-fallback";
import VideoArray from "@/components/video-array";
import { db } from "@/lib/db";
import { Suspense } from "react";


export default async function Id({ params }: { params: { id: string } }) {
  const user = await db.user.findFirst({ where: { id: params.id } });
  const videosByUser = await db.video.findMany({ where: { userId: user?.id } })

  return (
    <main className=" flex p-4 items-start flex-col">
      <h1 className="text-3xl font-semibold ">Videos by {user?.fullname}</h1>
      {videosByUser.map((video) => (
        <Suspense fallback={<VideoArrayFallback/>} key={video.id}>
          <VideoArray video={video}  />
        </Suspense>
      ))}
    </main>
  );
}
