'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	LogOutIcon,
	UserIcon,
	TvMinimalPlay,
	UploadIcon,
	PencilIcon
} from "lucide-react";
import { Button } from "../ui/button";
import SignOut from "@/actions/auth/sign-out";
import { useTransition } from 'react'
import { useRouter } from "next/navigation";
import { Link } from 'next-view-transitions'
import { User as PrismaUser } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Session, User } from "lucia";
import { toast } from "sonner";

export default function UserDropdown({
	user,
	userInfo
}: {
	user: {
		user: User
		session: Session
	} | {
		user: null;
		session: null;
	}
	userInfo: PrismaUser | null
}) {

	const router = useRouter();
	const [isPending, startTransition] = useTransition()
	const initailsName = userInfo?.fullname?.split(' ').map((e) => e.charAt(0))


	const signOut = async () => {
		startTransition(() => {
			SignOut().then((res) => {
				if (res?.success) {
					toast.success(res.success);
					router.push('/sign-in')
				} else toast.error(res.error)
			})
		})
	}

	return (
		<div className="flex items-center gap-2">
			{user.session ? (
				<DropdownMenu>
					<DropdownMenuTrigger
						className="flex items-center justify-center p-0 hover:bg-slate-200 transition-colors duration-300 rounded-full aspect-square gap-2 text-sm border "
					>
						<Avatar>
							<AvatarImage className=" object-cover" src={userInfo?.image ? `/api/stream/user/${userInfo?.image}` : "https://store-images.s-microsoft.com/image/apps.36764.13817186670444302.148c432a-9fce-4c7d-bf13-8a2bd3a527b3.2a7b94f3-ed66-45b6-aaf3-337c18d442cd?q=90&w=480&h=270"} />
							<AvatarFallback>{initailsName}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className=" mt-2 mr-4">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="gap-2 items-center"
							onClick={() => router.push(`/channel/${userInfo?.id}`)}>
							<TvMinimalPlay className="size-4" />
							Your Channel
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push(`/dashboard`)}
							className="flex gap-2 items-center">
							<PencilIcon className=" size-4 " />
							Dashboard
						</DropdownMenuItem>
						<DropdownMenuItem
							className="gap-2 items-center"
							onClick={() => router.push(`/profile`)}>
							<UserIcon className="size-4" />
							Edit Profile
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push(`/upload`)}
							className="flex gap-2 items-center">
							<UploadIcon className=" size-4 " />
							Upload
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={signOut} 
							className="gap-2 items-center focus:hover:bg-red-500 focus:hover:text-white">
							<LogOutIcon className="size-4"
							/>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 rounded-full aspect-square p-3  md:aspect-auto"
				>
					<Link className="flex items-center gap-2" href="/sign-in">
						<UserIcon className=" size-4" />
						<span className=" hidden md:block">Sign In</span>
					</Link>
				</Button>
			)}
		</div>
	)
}