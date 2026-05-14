"use client";

import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExpenseFilters({ onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Period
          </label>
          <Select defaultValue="current-month">
            <SelectTrigger className="w-[180px] h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Category
          </label>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-sm border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">More Filters</span>
          </Button>
        </div>
      </div>

      <div className="flex items-end">
        <Button
          onClick={onAddClick}
          className="h-10 bg-black rounded-sm hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 gap-2 font-medium px-6"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>
    </div>
  );
}
