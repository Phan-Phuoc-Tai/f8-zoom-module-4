import Header from "@/components/layouts/Header";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-300 mx-auto py-3">
      <Header />
      <main>{children}</main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
