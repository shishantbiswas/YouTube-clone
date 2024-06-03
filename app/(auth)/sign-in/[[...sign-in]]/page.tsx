import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata:Metadata ={
  title:`Sign In - YouTube Clone`
}


export default function Page() {
  return (
    <div className=" flex items-center justify-center h-screen">
      <SignIn />;
    </div>
  );
}
