"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Loader2Icon } from "lucide-react";
import { Verification } from "@/actions/auth/verification";
import { toast } from "sonner";
import { useTransition } from "react";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    startTransition(() => {

      Verification(token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            toast.success('Verification Successful')
            router.push(`/`)
          } else {
            setError(data.error)
            toast.error(data.error)
          }
        })
        .catch((error) => {
          setError(error);
        })
    })

  }, [token, success, error]);


  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center w-full h-screen justify-center">
      <div className=" bg-slate-100/70 p-8 rounded-lg">
        {isPending && (
          <>
            <h1 className="text-xl font-bold mb-4 opacity-50">Verification in Process</h1>
            <div className=" flex items-center gap-2">
              <Loader2Icon className=" animate-spin" />
              <span>Verifing...</span>
            </div>
          </>
        )}

        {success || error && !isPending && (
          <>
            <h1 className="text-xl font-bold mb-4 opacity-40">Verification in Failed</h1>
            <div className=" flex items-center gap-2">
              {success ?
                (<FormSuccess message={success} />)
                :
                (<FormError message={error} />)
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
}