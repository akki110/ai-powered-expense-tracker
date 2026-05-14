"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Housing & Utilities', value: 40 },
  { name: 'Technology', value: 25 },
  { name: 'Operational', value: 35 },
];

export default function CategoryBreakdownChart() {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm h-full flex flex-col shadow-sm">
      <h3 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white mb-6">Category Breakdown</h3>
      
      <div className="relative flex-1 min-h-[200px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              stroke="none"
              paddingAngle={2}
              dataKey="value"
            >
              <Cell fill="currentColor" className="text-black dark:text-white" />
              <Cell fill="currentColor" className="text-zinc-500 dark:text-zinc-400" />
              <Cell fill="currentColor" className="text-zinc-200 dark:text-zinc-700" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <div className="text-xl font-bold font-mono text-zinc-900 dark:text-white leading-none mb-1">100%</div>
          <div className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">Allocated</div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-black dark:bg-white rounded-sm"></div>
            <span className="text-zinc-600 dark:text-zinc-300 font-medium">Housing & Utilities</span>
          </div>
          <span className="font-mono text-xs text-zinc-900 dark:text-white font-bold">40%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-zinc-500 dark:bg-zinc-400 rounded-sm"></div>
            <span className="text-zinc-600 dark:text-zinc-300 font-medium">Technology</span>
          </div>
          <span className="font-mono text-xs text-zinc-900 dark:text-white font-bold">25%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
            <span className="text-zinc-600 dark:text-zinc-300 font-medium">Operational</span>
          </div>
          <span className="font-mono text-xs text-zinc-900 dark:text-white font-bold">35%</span>
        </div>
      </div>
    </div>
  );
}
