"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Banknote,
  Wallet,
  Download,
  X,
  PieChart,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", href: "/dashboard/expenses", icon: Banknote },
  { name: "Budget", href: "/dashboard/budgets", icon: Wallet },
  { name: "Export", href: "/dashboard/export", icon: Download },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  // A helper function to determine if a path is active
  const isActivePath = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 lg:pt-8 lg:pb-4 justify-between lg:justify-start">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-zinc-800 p-1.5 rounded-lg">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-zinc-900 font-bold tracking-tight">
                FinAI Tracker
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto mt-4">
          {navItems.map((item) => {
            const isActive = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-white dark:text-zinc-900 border-l-3 border-zinc-900 dark:border-white"
                    : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-foreground",
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-zinc-900 dark:text-white"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span className="tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile */}
        <div className="mb-5 h-14 flex justify-center items-center">
          <Button
            variant="ghost"
            className="w-48 h-10 border border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md"
            onClick={async () => {
              setMobileOpen(false);
              await logout();
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="tracking-wide">Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
