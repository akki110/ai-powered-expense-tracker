"use client";

import { Search, Bell, UserCircle, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header({ setMobileOpen }) {
  const pathname = usePathname();

  // Create a readable title from pathname
  const getTitle = () => {
    if (pathname === "/dashboard") return "DASHBOARD";
    const pathParts = pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart ? lastPart.toUpperCase() : "DASHBOARD";
  };

  return (
    <header className="h-[72px] border-b bg-card/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg md:text-xl tracking-[0.2em]">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search data..."
            className="w-[200px] lg:w-[280px] pl-9 bg-muted/40 border border-zinc-300 h-10 text-sm rounded-md focus-visible:ring-1 focus-visible:bg-muted/60 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-muted/60 transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-muted/60 transition-colors"
          >
            <UserCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        </div>
      </div>
    </header>
  );
}
