import { db } from "@/lib/db";
import { Link } from 'next-view-transitions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video } from "@prisma/client";
import formatDateOrTime from "@/utils/format-date-or-time";
import VideoArray from "@/components/video-array";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  return {
    title: `${params.name.charAt(0).toUpperCase() + params.name.slice(1)} - Category`,
  }
}


export default async function Category({
  params,
}: {
  params: { name: string };
}) {
  const data = await db.video.findMany({
    where: {
      category: `${params.name}`,
    },
    take: 10,
  });

  console.log(data);

  return (
    <main>
      <h1 className="font-semibold text-3xl p-4 capitalize">{params.name}</h1>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-3 md:m-5">
        {data.map(async (video: Video) => (
          <VideoArray key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
}
