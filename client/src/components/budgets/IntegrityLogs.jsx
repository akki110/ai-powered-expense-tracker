"use client";

export default function IntegrityLogs() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 rounded-sm shadow-sm">
      <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">INTEGRITY LOGS</h3>
      
      <div className="space-y-4 font-mono text-[10px] sm:text-[11px]">
        <div className="flex gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="shrink-0 text-zinc-400 dark:text-zinc-500">08:12:01</span>
          <span className="leading-relaxed">[SYSTEM] Budget ceiling for "Operating Costs" adjusted by ADMIN_01</span>
        </div>
        <div className="flex gap-3 text-red-600 dark:text-red-500">
          <span className="shrink-0 text-zinc-400 dark:text-zinc-500">07:45:22</span>
          <span className="leading-relaxed">[ALERT] Threshold 95% exceeded in "Operating Costs"</span>
        </div>
      </div>
    </div>
  );
}
