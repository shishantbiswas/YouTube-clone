import { VerificationForm } from "@/components/auth/verification";
import { Metadata } from "next";

export const  metadata:Metadata={
    title:'Verification in Process - YouTube'
}
export default function Verification(){
    return <VerificationForm />
}