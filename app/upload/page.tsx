import UploadForm from "@/components/upload-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Upload - YouTube Clone',
}

export default function UploadVideo() {  

  return (
   <UploadForm/>
  );
}
