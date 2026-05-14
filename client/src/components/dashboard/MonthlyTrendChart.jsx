"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'MON', value: 1800 },
  { name: 'TUE', value: 2400 },
  { name: 'WED', value: 2100 },
  { name: 'THU', value: 3100 },
  { name: 'FRI', value: 1500 },
  { name: 'SAT', value: 2600 },
  { name: 'SUN', value: 2300 },
];

const CustomLabel = (props) => {
  const { x, y, width, value, index } = props;
  if (data[index].name === 'THU') {
    return (
      <text x={x + width / 2} y={y - 10} fill="currentColor" className="text-black dark:text-white text-[10px] font-bold font-mono" textAnchor="middle" dominantBaseline="middle">
        {(value / 1000).toFixed(1)}k
      </text>
    );
  }
  return null;
};

export default function MonthlyTrendChart() {
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
          <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barSize={40}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a', fontWeight: 600, fontFamily: 'monospace' }} 
              dy={10}
            />
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
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              <LabelList dataKey="value" content={<CustomLabel />} />
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === 'THU' ? 'currentColor' : '#f4f4f5'} 
                  className={entry.name === 'THU' ? 'text-black dark:text-white' : 'dark:fill-zinc-900'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
