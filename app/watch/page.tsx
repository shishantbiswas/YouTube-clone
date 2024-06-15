import { HlsPlayer } from "@/components/hls-player";
import VideoDetails from "@/components/video-details";
import { db } from "@/lib/db";
import redis from "@/lib/redis";
import { Video } from "@prisma/client";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const data = await db.video.findFirst({ where: { id: searchParams.q } });

  if (!data) {
    return {
      title: "Video Title Missing",
    };
  }

  return {
    title: `${data.title} - YouTube Clone`,
  };
}

export default async function Watch({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const data: Video = await fetchVideoDetails(searchParams.q);

  if (!data) {
    throw new Error("Error Fetching Video Details");
  }

  const src = `/api/stream/${searchParams.q}/index.m3u8`;

  const userInfo = await db.user.findFirst({ where: { id: data.userId } })

  return (
    <main>
      <HlsPlayer
        videoSource={src}
        thumbnailSource={`/api/stream/${data.id}/${data.thumbnail}`}
      />
      <VideoDetails
        userInfo={userInfo}
        video={data}
      />
    </main>
  );
}

async function fetchVideoDetails(id: string) {
  const cachedData = await redis.get(id);

  if (cachedData) {
    console.log('return cached data');
    return JSON.parse(cachedData);
  }

  const data = await db.video.findFirst({ where: { id: id } });

  if (!data) {
    throw new Error("Fetching Video details failed");
  }
  await redis.set(id, JSON.stringify(data), 'EX', 10 * 60);

  return data
}
