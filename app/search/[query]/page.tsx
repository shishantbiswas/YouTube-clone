import VideoArrayFallback from "@/components/fallback-ui/video-array-fallback";
import VideoArray from "@/components/video-array"
import { Video } from "@prisma/client"
import { Suspense } from "react"

export default async function Search({ params }: { params: { query: string } }) {

  let result: { data?: Video[] } = { data: [] }
  await fetch(`http:127.0.0.1:3000/api/search?search_query=${params.query}`).then(
    async (response) => {
      result = (await response.json())
    }
  );

  return (
    <main className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-3 md:m-5">
      <Suspense fallback={<VideoArrayFallback />}>
        {result?.data?.map(async (video) => (
          <VideoArray key={video.id} video={video} />
        ))}
      </Suspense>
    </main>

  )
}