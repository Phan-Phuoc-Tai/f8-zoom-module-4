import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";
import TanstackProviders from "@/providers/tanstack.provider";
import React from "react";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout flex">
      <TanstackProviders>
        <SideBar />
        <main className="main-layout flex-1 flex flex-col">
          <Header />
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </TanstackProviders>
    </div>
  );
}
