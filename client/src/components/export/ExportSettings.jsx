"use client";

import { Download, FileText, FileSpreadsheet, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ExportSettings({ onExport, exporting }) {
  const [format, setFormat] = useState("csv");
  const [dataScope, setDataScope] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerate = () => {
    onExport({ format, dataScope, startDate, endDate });
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Download className="h-5 w-5 text-zinc-900 dark:text-white" />
        <h3 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">Export Configuration</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              Data Scope
            </label>
            <Select value={dataScope} onValueChange={setDataScope}>
              <SelectTrigger className="w-full h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm">
                <SelectValue placeholder="Select Data Scope" />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                <SelectItem value="all">Complete Transaction History</SelectItem>
                <SelectItem value="expenses">Expenses Only</SelectItem>
                <SelectItem value="budgets">Budget Allocations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-11 border-zinc-200 dark:border-zinc-800 rounded-sm text-sm" />
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-11 border-zinc-200 dark:border-zinc-800 rounded-sm text-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            Export Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              onClick={() => setFormat("csv")}
              className={`flex flex-col items-center justify-center gap-3 p-6 border rounded-sm transition-all ${
                format === "csv" 
                ? "border-black bg-zinc-50 dark:border-white dark:bg-zinc-900" 
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950"
              }`}
            >
              <FileSpreadsheet className={`h-8 w-8 ${format === "csv" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-600"}`} />
              <span className={`text-xs font-bold tracking-widest uppercase ${format === "csv" ? "text-black dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}>CSV</span>
            </button>
            <button 
              onClick={() => setFormat("pdf")}
              className={`flex flex-col items-center justify-center gap-3 p-6 border rounded-sm transition-all ${
                format === "pdf" 
                ? "border-black bg-zinc-50 dark:border-white dark:bg-zinc-900" 
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950"
              }`}
            >
              <FileText className={`h-8 w-8 ${format === "pdf" ? "text-red-600 dark:text-red-400" : "text-zinc-400 dark:text-zinc-600"}`} />
              <span className={`text-xs font-bold tracking-widest uppercase ${format === "pdf" ? "text-black dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}>PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <Button onClick={handleGenerate} disabled={exporting} className="h-11 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-sm font-bold tracking-widest text-[11px] uppercase px-8 flex items-center gap-2">
          <Download className="h-4 w-4" />
          {exporting ? "Generating..." : "Generate Export"}
        </Button>
      </div>
    </div>
  );
}
