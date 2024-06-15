"use client";
import { Link } from 'next-view-transitions'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Delete from "@/actions/delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Video } from "@prisma/client";
import formatDateOrTime from "@/utils/format-date-or-time";

export default function EditComponent({
  video,
}: {
  video:Video
}) {

  const router = useRouter()
  return (
    <div key={video.id} className=" w-full rounded-lg ">
      <img
        className=" h-[260px] sm:h-[200px] md:h-[250px]  lg:h-[230px] xl:h-[260px]  w-full object-cover rounded-lg"
        src={`api/stream/${video.id}/${video.thumbnail}`}
        alt={video.title}
      />
      <div className="flex gap-2 items-start justify-between mt-1">
        <div>
          <h1 className=" text-md leading-tight mb-1 font-medium ">
            {video.title}
          </h1>
          <div className=" flex items-center gap-2">
            <p className="opacity-60 text-sm">
              {formatDateOrTime(video.createdAt)}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/${video.id}`}>
              <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                <PencilIcon className=" size-4 " />
                Edit
              </DropdownMenuItem>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger className="flex items-center gap-2 text-sm rounded-sm px-2 py-1.5 hover:bg-red-600 hover:text-white transition-all w-full  cursor-pointer">
                <TrashIcon className=" size-4 " />
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your <span className=" font-bold">{video.title}</span> from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={async () => Delete(video).then(()=>router.refresh())}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
