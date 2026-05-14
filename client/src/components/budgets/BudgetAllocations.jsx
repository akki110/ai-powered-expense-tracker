"use client";

import { Sparkles, AlertTriangle, Megaphone, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function BudgetAllocations({ budgets = [], loading, onDelete }) {
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
        {loading ? (
          <div className="text-center p-8 text-muted-foreground border border-zinc-200 dark:border-zinc-800 rounded-sm">Loading allocations...</div>
        ) : budgets.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground border border-zinc-200 dark:border-zinc-800 rounded-sm">No budgets established yet.</div>
        ) : budgets.map((budget) => {
          const progress = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
          let Icon = Archive;
          let iconColor = "text-zinc-500";
          let statusText = "WITHIN DEFINED PARAMETERS";
          let alertLevel = "STABLE";
          let alertColor = "text-zinc-400 dark:text-zinc-500";
          let barColor = "bg-zinc-400 dark:bg-zinc-500";

          if (progress >= 90) {
            Icon = AlertTriangle;
            iconColor = "text-red-600 dark:text-red-500";
            statusText = "LIMIT REACHED SOON";
            alertLevel = "CRITICAL ALERT";
            alertColor = "text-red-600 dark:text-red-500";
            barColor = "bg-red-600 dark:bg-red-500";
          } else if (progress >= 75) {
            Icon = Megaphone;
            iconColor = "text-zinc-900 dark:text-zinc-100";
            statusText = "THRESHOLD SURPASSED";
            alertLevel = "CAUTION";
            alertColor = "text-zinc-500 dark:text-zinc-400";
            barColor = "bg-black dark:bg-white";
          }

          return (
          <div key={budget._id} className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete?.(budget._id)}
              className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="flex justify-between items-start mb-4 pr-10">
              <div className="flex items-center gap-3">
                <Icon className={cn("h-5 w-5 mt-0.5", iconColor)} />
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white tracking-wide text-base uppercase">{budget.category}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{budget.period} limit</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-zinc-900 dark:text-white tracking-wide">
                  <span className={progress > 90 ? "text-red-600 dark:text-red-500" : ""}>
                    ${(budget.spent || 0).toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-600 mx-1">/</span>
                  <span className={progress > 90 ? "text-red-600 dark:text-red-500" : ""}>
                    ${(budget.limit || 0).toLocaleString("en-US", {minimumFractionDigits: 2})}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mt-1">
                  {progress.toFixed(1)}% EXPENDED
                </div>
              </div>
            </div>

            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-sm overflow-hidden mb-4 border border-zinc-200/50 dark:border-zinc-800/50">
              <div 
                className={cn("h-full rounded-sm transition-all", barColor)} 
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
              <span className="text-muted-foreground">{statusText}</span>
              <span className={alertColor}>{alertLevel}</span>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
