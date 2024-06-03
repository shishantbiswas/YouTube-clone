import { db } from "@/lib/db";
import Link from "next/link";
import moment from "moment";
import { clerkClient } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  return {
    title: `${params.name.charAt(0).toUpperCase() + params.name.slice(1)} - Category`,
  }
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
export default async function Category({
  params,
}: {
  params: { name: string };
}) {
  const data = await db.video.findMany({
    where: {
      category: `${params.name} - YouTube Clone`,
    },
    take: 10,
  });

  return (
    <>
    <h1 className="font-semibold text-3xl p-2 capitalize">{params.name}</h1>
    <main className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 m-2">
      {data.map(async (video:Video) => {
        const userInfo = await clerkClient.users.getUser(video.userId);

        return (
          <Link key={video.id} href={`/watch?q=${video.videoId}`}>
            <div className=" w-full rounded-lg ">
              <img
                className=" h-[220px] xl:h-[250px] w-full object-cover rounded-lg"
                src={`${process.env.DEPLOYED_WEBSITE}/api/stream/${video.videoId}/${video.thumbnail}`}
                alt={video.title}
              />
              <div className="flex gap-2 items-start mt-1">
                <Avatar>
                  <AvatarImage src={userInfo?.imageUrl} />
                  <AvatarFallback>
                    {userInfo.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className=" text-md leading-tight mb-1 font-medium ">
                    {video.title}
                  </h1>
                  <p className="opacity-60 text-sm">{userInfo.fullName}</p>
                  <div className=" flex items-center gap-2">
                    <p className="opacity-60 text-sm">
                      {moment(video.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </main>
    </>
  );
}
