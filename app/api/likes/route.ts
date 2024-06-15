import { db } from "@/lib/db";
import { type NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Data is Missing" });
  }

  const currentLikes = await db.video.findFirst({
    where: { id: id },
  });

  if (!currentLikes) {
    return Response.json({ error: "Server Error" });
  }

  const updatedLikes = await db.video.update({
    where: { id: id },
    data: {
      likes: currentLikes?.likes + 1,
    },
  });

  return Response.json({ success: updatedLikes });
}
