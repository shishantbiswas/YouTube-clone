"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex  flex-col h-screen items-center justify-center">
      <div className="p-8 opacity-90 border-gray-400 border bg-gray-100 rounded-xl max-w-[300px] flex flex-col text-center items-center justify-center">
      <h2 className=" text-3xl font-bold ">Something went wrong!</h2>
      <p className=" leading-tight my-4">Error : {error.message}</p>
      <Button
      variant={'destructive'}
        onClick={() => reset()}
        className=" mt-2 w-fit rounded-lg flex items-center justify-center gap-2 transition-all font-semibold"
      >
        Try Again <RefreshCcw size={15} />
      </Button>
      </div>
    </div>
  );
}