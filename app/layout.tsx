import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "YouTube Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <Navbar />
            {children}
            <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
