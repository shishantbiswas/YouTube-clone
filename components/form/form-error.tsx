import { CircleAlert } from "lucide-react"


export function FormError({ message }: {message?: string}) {
  if (!message) return null

  return (
    <div className="flex items-center gap-2 bg-destructive/15 rounded-md text-sm text-destructive p-3">
      <CircleAlert className="size-4" />
      {message}
    </div>
  )
}