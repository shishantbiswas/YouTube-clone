import UpdateForm from "@/components/update-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Update Info - YouTube Clone',
}

export default function Edit() {
 
  return (
   <UpdateForm/>
  );
}
