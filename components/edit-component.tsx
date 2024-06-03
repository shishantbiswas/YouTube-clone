"use client";
import moment from "moment";
import Link from "next/link";
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

export default function EditComponent({
  video,
}: {
  video: {
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
}) {

  const router = useRouter()
  return (
    <div key={video.id} className=" w-full rounded-lg ">
      <img
        className=" h-[220px] xl:h-[250px] w-full object-cover rounded-lg"
        src={`http://127.0.0.1:3000/api/stream/${video.videoId}/${video.thumbnail}`}
        alt={video.title}
      />
      <div className="flex gap-2 items-start justify-between mt-1">
        <div>
          <h1 className=" text-md leading-tight mb-1 font-medium ">
            {video.title}
          </h1>
          <div className=" flex items-center gap-2">
            <p className="opacity-60 text-sm">
              {moment(video.createdAt).format("MMMM Do YYYY")}
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
            <Link href={`/edit/${video.id}`}>
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
