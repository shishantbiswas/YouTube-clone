import SignUp from '@/components/auth/sign-up';
import { validateRequest } from '@/lib/auth';
import { Metadata } from "next";
import { redirect } from 'next/navigation';
import React from "react";

export const metadata:Metadata ={
  title:`Sign Up - YouTube Clone`
}

export default async function Page() {

  const user = await validateRequest()

  if (user.user) {
    redirect('/')
  }

  return(
  <div className=" flex items-center justify-center h-screen">
   <SignUp />
  </div>  
  )
}
