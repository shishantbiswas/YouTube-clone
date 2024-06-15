import { Link } from 'next-view-transitions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import formatDateOrTime from "@/utils/format-date-or-time";
import { Video } from "@prisma/client";
import { db } from "@/lib/db";

export default async function VideoArray({ video }: { video: Video }) {
    
    const userInfo = await db.user.findFirst({ where: { id: video.userId } })
    const initailsName = userInfo?.fullname?.split(' ').map((e) => e.charAt(0))

    
    // await new Promise(resolve=>setTimeout(resolve,200000))

    return (
        <Link  href={`/watch?q=${video.id}`}>
            <div className=" w-full rounded-lg ">
                <img
                    className=" h-[260px] sm:h-[200px] md:h-[250px]  lg:h-[230px] xl:h-[260px]  w-full object-cover rounded-lg"
                    src={`/api/stream/${video.id}/${video.thumbnail}`}
                    alt={video.title}
                />
                <div className="flex gap-2 items-start mt-2">
                    <Avatar>
                    <AvatarImage className="object-cover" src={userInfo?.image ? `api/stream/user/${userInfo?.image}` : "https://store-images.s-microsoft.com/image/apps.36764.13817186670444302.148c432a-9fce-4c7d-bf13-8a2bd3a527b3.2a7b94f3-ed66-45b6-aaf3-337c18d442cd?q=90&w=480&h=270"} />
                    <AvatarFallback>{initailsName}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className=" text-md leading-tight font-medium ">{video.title}</h1>
                        <p className="opacity-60 text-sm">{userInfo?.username}</p>
                        <div className=" flex items-center gap-2 opacity-60 text-sm">
                            <p >
                                {formatDateOrTime(video.createdAt)}
                            </p>
                            <p>|</p>
                            <p>{video.view} Views</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}