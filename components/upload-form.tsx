"use client";
import Upload from "@/actions/upload";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { FormUploadMessage } from "@/components/form-upload-message";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function UploadForm() {
  const form = useForm();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onsubmit = (data: FormData) => {
    const file = data.get("video") as File;

    if (file.size > 104857600) {
      setError("File Size is Limited to 100MB !");
      return;
    } else if (!file.name) {
      setError("No Video File is Attached !");
      return;
    }
    setError("");
    setSuccess("");
    startTransition(() => {
      Upload(data).then((res) => {
        if (res?.success) {
          setSuccess(res?.success);
          toast({
            variant: "default",
            title: "Upload Successfull",
            description:
              "Your Video Was Successfully uploaded, you can now make edits to it.",
            action: (
              <ToastAction altText="Edit">
                <Link href={`/edit`}>Edit</Link>
              </ToastAction>
            ),
          });
        } else setError(res?.error);
      });
    });
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Form {...form}>
        <form action={onsubmit} className="space-y-6 border p-4 ">
          <h1 className=" text-3xl font-semibold">Upload</h1>
          <FormField
            control={form.control}
            name="title"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="My First Video" />
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
            name="video"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video File</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...form.register("video")}
                    onChange={(event) => {
                      field.onChange(event.target?.files?.[0] ?? undefined);
                    }}
                    type="file"
                    accept="video/*"
                  />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <FormUploadMessage isPending={isPending} />
          <Button className="w-full" disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
