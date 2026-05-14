"use client";

export default function BudgetSummaryCard() {
  return (
    <div className="bg-black text-white dark:bg-white dark:text-black p-6 rounded-sm flex flex-col space-y-6 shadow-md">
      <div>
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2">Total Monthly Ceiling</h3>
        <div className="text-4xl font-bold tracking-tight mb-2">$19,500.00</div>
        <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide">Calculated from 12 active sectors</div>
      </div>
      
      <div className="pt-2">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-zinc-300 dark:text-zinc-600">Current Burn</span>
          <span className="text-sm font-mono font-bold">$17,020.00</span>
        </div>
        <div className="h-1 w-full bg-zinc-800 dark:bg-zinc-200 rounded-sm overflow-hidden">
          <div className="h-full w-[87%] bg-white dark:bg-black rounded-sm" />
        </div>
      </div>
    </div>
  );
}
