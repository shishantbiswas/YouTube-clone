import { HlsPlayer } from "@/components/hls-player";
import WatchPage from "@/components/watch-page";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q: string };
}){

  const data = await db.video.findFirst({ where: { videoId: searchParams.q } });

  if(!data){
    return{
      title:'Video Title Missing'
    }
  }

  return {
    title: `${data.title} - YouTube Clone`,
  }
}


export default async function Watch({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const data = await db.video.findFirst({ where: { videoId: searchParams.q } });

  if(!data){
    throw new Error('Fetching Video details failed')
  }
  const src = `${process.env.DEPLOYED_WEBSITE}/api/stream/${searchParams.q}/index.m3u8`;
  const userInfo = await clerkClient.users.getUser(data.userId)


  return (
    <main>
      <HlsPlayer url={src} />
      <WatchPage userFullname={userInfo.fullName} userImage={userInfo.imageUrl} data={data} />
    </main>
  );
}
