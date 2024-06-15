import HamburgerDropdown from "./hamburger-dropdown";
import { Link } from 'next-view-transitions'
import UserDropdown from "./user-dropdown";
import NavSearch from "./nav-search";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";


export default async function Navbar() {

  const user = await validateRequest()
  const userInfo = await db.user.findFirst({where:{id:user.user?.id}})
  
  return (
    <>
      <header className="flex h-16 items-center px-4 md:px-6 lg:px-8 shadow w-full">
        <div className="flex w-full items-center justify-between">
          <div className=" flex items-center gap-4">
            <HamburgerDropdown  />
            <Link className="flex items-center gap-2" href="/">
              <span className="text-lg font-semibold text-nowrap">
                YouTube Clone
              </span>
            </Link>
          </div>
          <NavSearch />
          <UserDropdown user={user} userInfo={userInfo} />
        </div>
      </header>
    </>
  );
}
