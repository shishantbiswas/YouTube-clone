"use client";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WatchPage({
  data,
  userImage,
  userFullname,
}: {
  data: {
    id: string;
    userId: string;
    title: string;
    description: string;
    thumbnail: string;
    videoId: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  };
  userImage: string | null;
  userFullname: string | null;
}) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold ">{data?.title}</h1>
      <div className=" rounded-lg">
          <div className="flex my-4 items-center gap-2">
            <Avatar>
              <AvatarImage src={userImage || ""} />
              <AvatarFallback>{userFullname?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{userFullname}</p>
          </div>
        <Link
          href={`/category/${data.category}`}
          className=" capitalize px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-all rounded-full"
        >
          {data?.category}
        </Link>
        <p className="mt-4"><span className=" opacity-60">Description </span><br/>{data?.description}</p>
      </div>
    </div>
  );
}
