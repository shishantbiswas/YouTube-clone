import {  TriangleAlertIcon } from "lucide-react"


export function FormUploadMessage({ isPending }: {isPending?: boolean}) {
if(!isPending) return null
  return (
    <div className="flex items-center gap-2 bg-yellow-200 rounded-md text-sm text-yellow-700 p-3">
      <TriangleAlertIcon className="size-4" />
      <p className=" text-wrap">Uploading Video, Please be patient !</p>
    </div>
  )
}