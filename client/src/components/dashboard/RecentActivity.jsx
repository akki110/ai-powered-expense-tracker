"use client";

import { CreditCard, Cloud, Utensils, Plane } from "lucide-react";

export default function RecentActivity({ activities = [] }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm relative shadow-sm mb-8">
      <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <h3 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-black dark:hover:text-white transition-colors border-b border-zinc-300 dark:border-zinc-700 pb-0.5">
          View_All_Logs
        </button>
      </div>

      <div className="flex flex-col">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">No recent activity.</div>
        ) : activities.map((activity, index) => (
          <div
            key={activity._id}
            className={`p-4 sm:p-6 flex items-center justify-between ${index !== activities.length - 1 ? "border-b border-zinc-200 dark:border-zinc-800" : ""}`}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center rounded-sm shrink-0">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">
                  {activity.merchant}
                </h4>
                <div className="text-[10px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {new Date(activity.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 sm:gap-2">
              <div className="font-mono font-bold text-zinc-900 dark:text-white text-sm sm:text-base tracking-wide">
                -${activity.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </div>
              {activity.verified ? (
                <div className="text-[8px] sm:text-[9px] font-bold tracking-widest bg-blue-900 text-blue-100 px-1.5 py-0.5 rounded-[2px] uppercase">
                  AI_VERIFIED
                </div>
              ) : (
                <div className="text-[8px] sm:text-[9px] font-bold tracking-widest bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded-[2px] uppercase">
                  {activity.category}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
