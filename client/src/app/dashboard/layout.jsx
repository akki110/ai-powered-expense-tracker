"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
