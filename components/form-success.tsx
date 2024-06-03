import { CheckCircle } from "lucide-react"


export function FormSuccess({ message }: {message?: string}) {
  if (!message) return null

  return (
    <div className="flex items-center gap-2 bg-emerald-500/15 rounded-md text-sm text-emerald-500 p-3">
      <CheckCircle className="size-4" />
      {message}
    </div>
  )
}