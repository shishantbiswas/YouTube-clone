export default function VideoArrayFallback() {
  return (
    <>
      {[...Array.from(Array(6).keys())].map((i) => (
        <div
          key={i}
          style={{animationDuration:'1800ms'}}
        >
          <div
            className=" rounded-lg  h-[260px] sm:h-[200px] md:h-[250px]  lg:h-[230px] xl:h-[260px] bg-gray-400 w-full inline-block animate-pulse" />
          <div className="flex gap-2 items-start mt-2">
            <div className="size-12 rounded-full bg-gray-400 animate-pulse" />
            <div>
              <div className=" w-36 h-7 rounded-lg  bg-gray-400 animate-pulse" />
              <div className="flex gap-2 mt-2">
              <div className=" w-12 h-4 bg-gray-400 animate-pulse rounded-lg " />
              <div className=" w-1 h-4 bg-gray-400 animate-pulse rounded-lg " />
                <div className=" w-8 h-4 bg-gray-400 animate-pulse rounded-lg " />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}