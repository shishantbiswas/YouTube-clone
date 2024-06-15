import { db } from "@/lib/db";
import redis from "@/lib/redis";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("search_query");

  if (!searchQuery) {
    return Response.json({ error: "Empty Search !" });
  }

  const cachedSearchTerm = await redis.get(searchQuery)
  if(cachedSearchTerm){
    return Response.json({ data: JSON.parse(cachedSearchTerm) })
  }

  const data = await db.video.findMany({
    where: {
      title:{
        contains:searchQuery
      }
    },
  });

  await redis.set(searchQuery,JSON.stringify(data),"EX",60*60)

  return Response.json({ data: data });
}
