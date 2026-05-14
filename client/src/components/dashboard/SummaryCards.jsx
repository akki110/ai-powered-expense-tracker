"use client";

import { TrendingUp, TrendingDown, Clock, Sparkles } from "lucide-react";

export default function SummaryCards({ summary }) {
  const { totalSpendingMonthly = 0, spendingChange = 0, activeBudgetsCount = 0, budgetsNearingLimit = 0, aiPrediction = 0 } = summary || {};
  const isIncrease = spendingChange >= 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm flex flex-col justify-between shadow-sm">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">Total Spending (Monthly)</h3>
          <div className="text-3xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">${totalSpendingMonthly.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
        </div>
        <div className={`flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wide ${isIncrease ? 'text-red-600 dark:text-red-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
          {isIncrease ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{isIncrease ? '+' : ''}{spendingChange.toFixed(1)}% vs last month</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm flex flex-col justify-between shadow-sm">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">Active Budgets</h3>
          <div className="text-3xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">{activeBudgetsCount < 10 ? `0${activeBudgetsCount}` : activeBudgetsCount}</div>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-mono font-bold tracking-wide">
          <Clock className="h-3 w-3" />
          <span>{budgetsNearingLimit} budgets nearing limit</span>
        </div>
      </div>

      {/* Card 3 (AI Prediction) */}
      <div className="bg-black text-white dark:bg-white dark:text-black p-6 rounded-sm flex flex-col justify-between shadow-md">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">AI Prediction</h3>
          <div className="text-3xl font-bold tracking-tight mb-4">${aiPrediction.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 rounded-sm text-[10px] font-bold tracking-widest text-zinc-300 dark:text-zinc-600 border border-zinc-800 dark:border-zinc-200 uppercase cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
            <Sparkles className="h-3 w-3" />
            Optimize Flow Available
          </div>
        </div>
      </div>
    </div>
  );
}
