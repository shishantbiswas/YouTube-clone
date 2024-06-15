import { Link } from 'next-view-transitions'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  BookmarkIcon,
  CompassIcon,
  FilmIcon,
  GamepadIcon,
  HistoryIcon,
  HomeIcon,
  MusicIcon,
  NewspaperIcon,
  PlayIcon,
  SearchIcon,
  TrendingUpIcon,
  TvIcon,
} from "lucide-react";

export function HomePage() {
  return (
    <>
      <header className="flex h-16 items-center px-4 md:px-6 lg:px-8 shadow">
        <div className="flex w-full max-w-6xl items-center justify-between">
          <Link className="flex items-center gap-2" href="#">
            <PlayIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Streamify</span>
          </Link>
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full rounded-md bg-gray-100 pl-10 pr-4 py-2 text-sm focus:bg-white dark:bg-gray-800 dark:text-gray-50"
              placeholder="Search videos..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)]">
        
        <main className="flex-1 overflow-auto">
          <section className="bg-gray-100 dark:bg-gray-800 py-8 md:py-12 lg:py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-2 lg:col-span-1">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <img
                      alt="Featured video"
                      className="h-full w-full object-cover"
                      height={360}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "640/360",
                        objectFit: "cover",
                      }}
                      width={640}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                      <div className="flex h-full flex-col justify-end">
                        <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                          Featured Video
                        </h2>
                        <p className="mt-2 text-sm text-gray-300 md:text-base lg:text-lg">
                          Check out our latest featured video.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <img
                      alt="Recent upload 1"
                      className="h-full w-full object-cover"
                      height={180}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "320/180",
                        objectFit: "cover",
                      }}
                      width={320}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                      <div className="flex h-full flex-col justify-end">
                        <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
                          Recent Upload 1
                        </h3>
                        <p className="mt-1 text-xs text-gray-300 md:text-sm lg:text-base">
                          Check out our latest upload.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <img
                      alt="Recent upload 2"
                      className="h-full w-full object-cover"
                      height={180}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "320/180",
                        objectFit: "cover",
                      }}
                      width={320}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                      <div className="flex h-full flex-col justify-end">
                        <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
                          Recent Upload 2
                        </h3>
                        <p className="mt-1 text-xs text-gray-300 md:text-sm lg:text-base">
                          Check out our latest upload.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-8 md:py-12 lg:py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Recent Uploads
                </h2>
                <Link
                  className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-950"
                  href="#"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <img
                    alt="Recent upload 3"
                    className="h-full w-full object-cover"
                    height={180}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "320/180",
                      objectFit: "cover",
                    }}
                    width={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                    <div className="flex h-full flex-col justify-end">
                      <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
                        Recent Upload 3
                      </h3>
                      <p className="mt-1 text-xs text-gray-300 md:text-sm lg:text-base">
                        Check out our latest upload.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <img
                    alt="Recent upload 4"
                    className="h-full w-full object-cover"
                    height={180}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "320/180",
                      objectFit: "cover",
                    }}
                    width={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                    <div className="flex h-full flex-col justify-end">
                      <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
                        Recent Upload 4
                      </h3>
                      <p className="mt-1 text-xs text-gray-300 md:text-sm lg:text-base">
                        Check out our latest upload.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <img
                    alt="Recent upload 5"
                    className="h-full w-full object-cover"
                    height={180}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "320/180",
                      objectFit: "cover",
                    }}
                    width={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                    <div className="flex h-full flex-col justify-end">
                      <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
                        Recent Upload 5
                      </h3>
                      <p className="mt-1 text-xs text-gray-300 md:text-sm lg:text-base">
                        Check out our latest upload.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <img
                    alt="Recent upload 6"
                    className="h-full w-full object-cover"
                    height={180}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "320/180",
                      objectFit: "cover",
                    }}
                    width={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6 lg:p-8">
                    <div className="flex h-full flex-col justify-end">
                      <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
                        Recent Upload 6
                      </h3>
                      <p className="mt-1 text-xs text-gray-300 md:text-sm lg:text-base">
                        Check out our latest upload.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
