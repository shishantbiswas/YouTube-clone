"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { FormUploadMessage } from "@/components/form/form-upload-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Update from "@/actions/update";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function UpdateForm(){
    const form = useForm();
    const pathname = usePathname();
    const videoId = pathname.split("/")[2];
  
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
  
    const onsubmit = (data: FormData) => {
      if (error || success || isPending) {
        setError("");
        setSuccess("");
      }
      startTransition(() => {
        Update(data, videoId).then((res) => {
          if (res?.success) {
            setSuccess(res?.success);
            toast("Update Successfull",{
              description: "Your Video Was Successfully Updated ",
            });
          } else setError(res?.error);
        });
      });
    };
    return(
        <main>
        <div className="w-full min-h-screen flex items-center justify-center">
          <Form {...form}>
            <form action={onsubmit} className="space-y-6 border p-4 ">
              <h1 className=" text-3xl font-semibold">Update</h1>
              <FormField
                control={form.control}
                name="title"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="my updated video title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="description"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Today was a good day, Vincet"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select {...form.register("category")} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="movie">Movie</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="image"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...form.register("image")}
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                        }}
                        type="file"
                        accept="image/*"
                      />
                    </FormControl>
                    <FormDescription>Image is Optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormError message={error} />
              <FormSuccess message={success} />
              <FormUploadMessage isPending={isPending} />
              <Button className="w-full" disabled={isPending} type="submit">
                Update
              </Button>
            </form>
          </Form>
        </div>
      </main>
    )
}