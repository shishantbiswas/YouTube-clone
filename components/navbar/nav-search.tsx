'use client'

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Video } from "@prisma/client";
import { Link } from "next-view-transitions";


export default function NavSearch() {

  const router = useRouter();


  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<{ data: Video[] } | null>();

  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length > 0) {
      router.push(`/search/${query}`);
      setResult(null);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      const fetchData = async () => {
        await fetch(`/api/search?search_query=${query}`).then(
          async (response) => {
            const result = await response.json();
            console.log(result);
            setResult(result);
          }
        );
      };
      fetchData();
    }
  }, [query]);


  return (
    <div className="flex w-full max-w-sm min-w-[140px] mx-8 items-center relative">
      <form
        onSubmit={searchSubmit}
        className="flex w-full  items-center relative"
      >
        <Input
          placeholder="Search ..."
          className=" rounded-full pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {result && result.data && result.data.length > 0 && query.length > 0 && (
        <div className=" absolute left-0 flex flex-col justify-center gap-2 rounded-lg top-12 w-full items-start pl-8 p-4 bg-gray-200">
          {result.data.map((res) => (
            <Link
              target="_blank"
              href={`/watch?q=${res.id}`}
              key={res.id}
            >
              <p className=" flex items-center justify-center gap-2">
                <SearchIcon className=" size-4" />
                {res.title}
              </p>
            </Link>
          ))}
        </div>
      )}
      <div className="absolute w-fit rounded-full aspect-square p-2 overflow-hidden left-2 ">
        <SearchIcon opacity={0.5} className=" size-4 aspect-square" />
      </div>
    </div>
  )
}