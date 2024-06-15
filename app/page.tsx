import { db } from "@/lib/db";
import { Metadata } from "next";

import { Suspense } from "react";
import VideoArray from "@/components/video-array";
import VideoArrayFallback from "@/components/fallback-ui/video-array-fallback";

export const metadata: Metadata = {
  title: 'Home - YouTube Clone',
}

export default async function Home() {
  const data = await db.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return (
    <main className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-3 md:m-5">
      <Suspense fallback={<VideoArrayFallback/>}>
        {data.map(async (video) => (
          <VideoArray key={video.id} video={video} />
        ))}
      </Suspense>
    </main>
  );
}


