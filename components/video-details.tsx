"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Video } from "@prisma/client";
import { StarIcon, ThumbsUpIcon } from "lucide-react";
import { Link } from 'next-view-transitions'
import { useEffect, useState } from "react";

export default function VideoDetails({
  video,
  userInfo
}: {
  video: Video
  userInfo: User | null
}) {

  const [view, setView] = useState<number>(video.view)
  const [likes, setLikes] = useState<number>(video.likes)

  const updateView = async () => {
    const updateViews = await fetch(`/api/view?id=${video.id}`, {
      method: "PATCH",
    });
    return updateViews.json();
  };

  const updateLikes = async () => {
    const updateLikes = await fetch(`/api/likes?id=${video.id}`, {
      method: "PATCH",
    });
    const like = await updateLikes.json();
    setLikes(like?.success?.likes)
  };

  useEffect(() => {
    setTimeout(() => {
      updateView().then((res) => {
        setView(res?.success?.view)
      });
    }, 5000);
  }, []);

  const initailsName = userInfo?.fullname?.split(' ').map((e) => e.charAt(0))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold ">{video?.title}</h1>
      <h1>View {view}</h1>

      <div className=" rounded-lg">
        <div className="flex justify-between items-center">
          <Link href={`/channel/${video.userId}`} className="flex my-4 items-center gap-2" >
            <Avatar>
              <AvatarImage className="object-cover" src={userInfo?.image ? `api/stream/user/${userInfo?.image}` : "https://store-images.s-microsoft.com/image/apps.36764.13817186670444302.148c432a-9fce-4c7d-bf13-8a2bd3a527b3.2a7b94f3-ed66-45b6-aaf3-337c18d442cd?q=90&w=480&h=270"} />
              <AvatarFallback>{userInfo?.fullname ? initailsName : userInfo?.username}</AvatarFallback>
            </Avatar>
            <p>{userInfo?.fullname || userInfo?.username}</p>
          </Link>

          <div className="flex items-center gap-2">

            <button
              onMouseDown={updateLikes}
              className="flex items-center h-fit gap-3 transition-all hover:bg-slate-300 bg-slate-200 py-1 px-3 rounded-full"
            >
              <StarIcon size={15} /> {likes}
            </button>
          </div>
        </div>

        <p className=" opacity-60 p-1">Category </p>
        <Link
          href={`/category/${video.category}`}
          className=" capitalize px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-all rounded-full"
        >
          {video?.category}
        </Link>
        <p className="mt-4">
          <span className=" opacity-60">Description</span>
          <br />
          {video?.description}
        </p>
      </div>
    </div>
  );
}
