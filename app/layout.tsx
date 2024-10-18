import React from "react";

import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";

import ContextProvider from "@/context";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME!,
  description: "public template to build dapps asap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Header />
          <Toaster />
          {children}
          {/* <footer className="flex gap-6 flex-wrap items-center justify-center p-4 bg-[#F4EFEA]">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/tnkshuuhei"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scaffold built by shutanaka.eth
            </a>
          </footer> */}
        </ContextProvider>
      </body>
    </html>
  );
}
