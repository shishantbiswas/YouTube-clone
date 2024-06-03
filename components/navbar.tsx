import {
  ClapperboardIcon,
  Gamepad2Icon,
  MenuIcon,
  MusicIcon,
  PencilIcon,
  PlayIcon,
  SearchIcon,
  UploadIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Navbar() {
  const { userId } = auth();
  return (
    <>
      <header className="flex h-16 items-center px-4 md:px-6 lg:px-8 shadow w-full">
        <div className="flex w-full items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <PlayIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Streamify</span>
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userId ? (
                  <>
                    <Link href={"/upload"}>
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <UploadIcon className=" size-4 " />
                        Upload
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/edit"}>
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <PencilIcon className=" size-4 " />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                  </>
                ):(
                  <>
                   <Link href={"/sign-in"}>
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <UserIcon className=" size-4 " />
                        Sign In
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
                <DropdownMenuLabel className="mt-4">Category</DropdownMenuLabel>
                <Link href={"/category/gaming"}>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <Gamepad2Icon className=" size-4 " />
                    Gaming
                  </DropdownMenuItem>
                </Link>
                <Link href={"/category/music"}>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <MusicIcon className=" size-4 " />
                    Music
                  </DropdownMenuItem>
                </Link>
                <Link href={"/category/movie"}>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <ClapperboardIcon className=" size-4 " />
                    Movie
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </>
  );
}
