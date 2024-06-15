'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { FormError } from "../form/form-error";
import { FormSuccess } from "../form/form-success";
import { Link } from 'next-view-transitions'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetSchema } from "@/schema/reset";
import Reset from "@/actions/auth/reset";


export default function ResetPage() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof resetSchema>) {
        startTransition(() => {
            Reset(values).then((res) => {
                if (res?.success) {
                    setSuccess(res?.success);
                } else {
                    setError(res?.error)
                }
            });
        });
    }

    return (
        <div className=" w-fit flex flex-col items-center  ">
            <h1 className=" font-bold text-3xl ml-14 my-6 text-start w-full">
                Reset Password
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6 min-w-[300px] px-8 sm:w-[400px] "
                >

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="my-4">
                                        <Input
                                            disabled={isPending}
                                            placeholder="johhnysilverhand@cp.nc"
                                            type="text"
                                            {...field}
                                        />
                                        
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Link href={"/sign-in"}>
                        <button className="my-4 text-sm opacity-70 mb-0">
                            Back to Sign In ?
                        </button>
                    </Link>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className=" w-full ">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </div>
    )
}