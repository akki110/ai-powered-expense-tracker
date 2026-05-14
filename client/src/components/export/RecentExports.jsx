"use client";

import { FileSpreadsheet, FileText, Download, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const exportsData = [
  {
    id: 1,
    name: "Q3_Financial_Summary",
    date: "Oct 24, 2023",
    size: "1.2 MB",
    type: "pdf",
  },
  {
    id: 2,
    name: "All_Transactions_YTD",
    date: "Oct 20, 2023",
    size: "4.5 MB",
    type: "csv",
  },
  {
    id: 3,
    name: "September_Expenses_Log",
    date: "Oct 01, 2023",
    size: "840 KB",
    type: "csv",
  }
];

export default function RecentExports() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-zinc-950 overflow-hidden mt-6 shadow-sm mb-12">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">Recent Archives</h3>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-[10px] pl-6">Report Name</TableHead>
            <TableHead className="text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-[10px]">Date Generated</TableHead>
            <TableHead className="text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-[10px]">File Size</TableHead>
            <TableHead className="text-right text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-[10px] pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exportsData.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="pl-6">
                <div className="flex items-center gap-3">
                  {file.type === "csv" ? (
                    <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                  ) : (
                    <FileText className="h-4 w-4 text-red-600 dark:text-red-500" />
                  )}
                  <span className="font-medium text-sm text-zinc-900 dark:text-white">{file.name}.{file.type}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{file.date}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{file.size}</TableCell>
              <TableCell className="text-right pr-6">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-black dark:hover:text-white rounded-sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-black dark:hover:text-white rounded-sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
