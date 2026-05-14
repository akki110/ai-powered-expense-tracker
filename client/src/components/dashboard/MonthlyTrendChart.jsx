"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useState } from 'react';

const CustomLabel = (props) => {
  const { x, y, width, value, index, data } = props;
  if (data && data[index] && data[index].isMax) {
    return (
      <text x={x + width / 2} y={y - 10} fill="currentColor" className="text-black dark:text-white text-[10px] font-bold font-mono" textAnchor="middle" dominantBaseline="middle">
        {(value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value)}
      </text>
    );
  }
  return null;
};

export default function MonthlyTrendChart({ chartData = [] }) {
  const [timeframe, setTimeframe] = useState('DAILY');

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm h-full flex flex-col shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">Monthly Trend</h3>
        <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden text-[10px] font-bold tracking-widest uppercase">
          <button 
            className={`px-3 py-1.5 transition-colors ${timeframe === 'DAILY' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}
            onClick={() => setTimeframe('DAILY')}
          >
            Daily
          </button>
          <button 
            className={`px-3 py-1.5 transition-colors border-l border-zinc-200 dark:border-zinc-800 ${timeframe === 'WEEKLY' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}
            onClick={() => setTimeframe('WEEKLY')}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barSize={40}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a', fontWeight: 600, fontFamily: 'monospace' }} 
              dy={10}
            />
            <YAxis hide domain={[0, max => Math.max(max, 100)]} />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-black text-white text-xs font-mono px-3 py-2 rounded-sm shadow-lg">
                      ${payload[0].value.toLocaleString()}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} minPointSize={4}>
              <LabelList dataKey="value" content={(props) => <CustomLabel {...props} data={chartData} />} />
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isMax ? 'currentColor' : '#f4f4f5'} 
                  className={entry.isMax ? 'text-black dark:text-white' : 'dark:fill-zinc-900'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
