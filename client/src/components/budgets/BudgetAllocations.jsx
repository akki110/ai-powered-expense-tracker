"use client";

import { Sparkles, AlertTriangle, Megaphone, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const allocations = [
  {
    id: 1,
    title: "Operating Costs",
    subtitle: "Cloud Services & Infrastructure",
    icon: AlertTriangle,
    iconColor: "text-red-600 dark:text-red-500",
    spent: 12450.00,
    total: 12500.00,
    progress: 99.6,
    statusText: "LIMIT REACHED SOON",
    alertLevel: "CRITICAL ALERT",
    alertColor: "text-red-600 dark:text-red-500",
    barColor: "bg-black dark:bg-white",
  },
  {
    id: 2,
    title: "Marketing Ops",
    subtitle: "SaaS Subscriptions & Ad Spend",
    icon: Megaphone,
    iconColor: "text-zinc-900 dark:text-zinc-100",
    spent: 4120.00,
    total: 5000.00,
    progress: 82.4,
    statusText: "THRESHOLD 80% SURPASSED",
    alertLevel: "CAUTION",
    alertColor: "text-zinc-500 dark:text-zinc-400",
    barColor: "bg-black dark:bg-white",
  },
  {
    id: 3,
    title: "Office Supplies",
    subtitle: "General Procurement",
    icon: Archive,
    iconColor: "text-zinc-500",
    spent: 450.00,
    total: 2000.00,
    progress: 22.5,
    statusText: "WITHIN DEFINED PARAMETERS",
    alertLevel: "STABLE",
    alertColor: "text-zinc-400 dark:text-zinc-500",
    barColor: "bg-zinc-400 dark:bg-zinc-500",
  }
];

export default function BudgetAllocations() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Active Allocations</h2>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold tracking-widest bg-indigo-100/50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          AI OPTIMIZED
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {allocations.map((item) => (
          <div key={item.id} className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 mt-0.5", item.iconColor)} />
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white tracking-wide text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-zinc-900 dark:text-white tracking-wide">
                  <span className={item.progress > 90 ? "text-red-600 dark:text-red-500" : ""}>
                    ${item.spent.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-600 mx-1">/</span>
                  <span className={item.progress > 90 ? "text-red-600 dark:text-red-500" : ""}>
                    ${item.total.toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mt-1">
                  {item.progress}% EXPENDED
                </div>
              </div>
            </div>

            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-sm overflow-hidden mb-4 border border-zinc-200/50 dark:border-zinc-800/50">
              <div 
                className={cn("h-full rounded-sm", item.barColor)} 
                style={{ width: `${Math.min(item.progress, 100)}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
              <span className="text-muted-foreground">{item.statusText}</span>
              <span className={item.alertColor}>{item.alertLevel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
