'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import signIn from "@/actions/auth/sign-in";
import { Link } from 'next-view-transitions'
import { useRouter } from "next/navigation";
import ProfileUpdate from "@/actions/profile-update";

export default function Profile({ fullname }: { fullname: string | undefined | null }) {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm();

  const router = useRouter()
  const fileRef = form.register("image");


  function onSubmit(values: FormData) {
    startTransition(() => {
      ProfileUpdate(values).then((res) => {
        if (res?.success) {
          setSuccess(res?.success);
          router.refresh()
        } else setError(res?.error);
      });
    });
  }


  return (
    <div className=" w-fit flex flex-col items-center justify-center  h-screen ">
      <h1 className=" font-bold text-3xl ml-14 my-6 text-start w-full">
        Update Profile
      </h1>
      <Form {...form}>
        <form
          action={onSubmit}
          className=" space-y-6 min-w-[300px] px-8 sm:w-[400px] "
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input type="file"
                  disabled={isPending}
                  placeholder="shadcn" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="mt-4">
                    <Input
                      disabled={isPending}
                      placeholder={fullname || "Johhny Silverhand"}
                      {...field}
                      type="text"
                    />

                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <Link href={"/reset"}>
              <button className="my-2 text-sm opacity-70 mb-0">
                Looking to reset password ?
              </button>
            </Link>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className=" w-full ">
            Update
          </Button>
        </form>
      </Form>
      <div>
      </div>
    </div>
  )
}