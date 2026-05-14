"use client";

import { MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateBudgetForm() {
  return (
    <div className="bg-zinc-100/50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm">
      <h3 className="font-bold text-zinc-900 dark:text-white tracking-wide text-lg mb-6">CREATE PARAMETER</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
            Category Identifier
          </label>
          <Select defaultValue="logistics">
            <SelectTrigger className="w-full h-11 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-sm">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectItem value="logistics">Logistics & Delivery</SelectItem>
              <SelectItem value="marketing">Marketing Ops</SelectItem>
              <SelectItem value="operating">Operating Costs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
            Fiscal Ceiling (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
            <Input 
              type="text" 
              placeholder="0.00" 
              className="w-full h-11 pl-7 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-sm font-mono"
            />
          </div>
        </div>

        <div className="bg-indigo-100/50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30 p-4 rounded-sm flex gap-3 mt-6 mb-6">
          <MonitorPlay className="h-4 w-4 text-indigo-900 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-900 dark:text-indigo-400 mb-1">AI Recommendation</span>
            <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-mono tracking-tight leading-relaxed">
              SET TO $3,200 BASED ON PREVIOUS 3-MONTH VARIANCE.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full h-11 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-sm font-bold tracking-widest text-[11px] uppercase transition-colors">
            Establish Budget
          </Button>
          <Button variant="outline" className="w-full h-11 bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm font-bold tracking-widest text-[11px] uppercase transition-colors">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
