"use client";

export default function BudgetSummaryCard({ budgets = [] }) {
  const totalLimit = budgets.reduce((acc, curr) => acc + (curr.limit || 0), 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + (curr.spent || 0), 0);
  const percentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;
  return (
    <div className="bg-black text-white dark:bg-white dark:text-black p-6 rounded-sm flex flex-col space-y-6 shadow-md">
      <div>
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2">Total Monthly Ceiling</h3>
        <div className="text-4xl font-bold tracking-tight mb-2">${totalLimit.toLocaleString("en-US", {minimumFractionDigits: 2})}</div>
        <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide">Calculated from {budgets.length} active sectors</div>
      </div>
      
      <div className="pt-2">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-zinc-300 dark:text-zinc-600">Current Burn</span>
          <span className="text-sm font-mono font-bold">${totalSpent.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
        </div>
        <div className="h-1 w-full bg-zinc-800 dark:bg-zinc-200 rounded-sm overflow-hidden">
          <div className="h-full bg-white dark:bg-black rounded-sm transition-all" style={{ width: `${Math.min(percentage, 100)}%` }} />
        </div>
      </div>
    </div>
  );
}
