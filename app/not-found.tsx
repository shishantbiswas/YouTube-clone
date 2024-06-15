import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Metadata } from "next";
import { Link } from 'next-view-transitions'
import React from "react";

export const metadata: Metadata = {
  title: "Not Found 404 - YouTube Clone",
};

export default function notFound() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="p-4 text-center h-fit flex space-y-4 item-center justify-center flex-col opacity-90 border-gray-400 border bg-gray-100 rounded-xl max-w-[300px]">
        <h1 className=" text-3xl font-semibold lg:text-8xl">404 Not Found</h1>
        <p className="capitalize opacity-70  text-lg">
          the resourse does not exist
        </p>
        <Link href={"/"} className="flex items-center justify-center">
          <Button className="flex items-center gap-4">
            <HomeIcon /> Go Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
