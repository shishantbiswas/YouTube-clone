"use client";
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
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { FormError } from "../form/form-error";
import { FormSuccess } from "../form/form-success";
import { signInSchema } from "@/schema/sign-in";
import signIn from "@/actions/auth/sign-in";
import { Link } from 'next-view-transitions'
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter()

  function onSubmit(values: z.infer<typeof signInSchema>) {
    startTransition(() => {
      signIn(values).then((res) => {
        if (res?.success) {
          setSuccess(res?.success);
          router.push("/")
          toast.success("Signed In");
        } else setError(res?.error);
      });
    });
  }

  return (
    <div className=" w-fit flex flex-col items-center  ">
      <h1 className=" font-bold text-3xl ml-14 my-6 text-start w-full">
        Sign In
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 min-w-[300px] px-8 sm:w-[400px] "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="johhnysilverhand@cp.nc"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
               <FormLabel className=" justify-between flex items-center">
                  Password
                  <Button asChild variant={'link'} size={'sm'} className=" text-sm opacity-70 mb-0">
                    <Link href={"/reset"}>
                      Forgot Password ?
                    </Link>
                  </Button>
                </FormLabel>
                <FormControl>
                  <div className="mt-4">
                    <Input
                      disabled={isPending}
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <div className=" flex items-center gap-2 mt-4">
                      <Checkbox
                        id="terms2"
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword(!showPassword)}
                      />

                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <Link href={"/sign-up"}>
              <button className="my-2 text-sm opacity-70 mb-0">
                Don&apos;t Have a Account ?
              </button>
            </Link>
            <Link href={"/reset"}>
              <button className="my-2 text-sm opacity-70 mb-0">
                Forgot Password
              </button>
            </Link>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className=" w-full ">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
