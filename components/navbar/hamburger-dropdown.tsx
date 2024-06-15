import {
  ClapperboardIcon,
  Gamepad2Icon,
  LogOutIcon,
  MenuIcon,
  MusicIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'next-view-transitions'
import { User } from "lucia";

export default function HamburgerDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-2">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
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
  )

}