"use client";

import {
  Sparkles,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const expenses = [
  {
    id: 1,
    date: "2024-04-12",
    merchant: "AWS Cloud Services",
    detail: "Monthly infrastructure usage",
    category: "Technology",
    amount: "$1,240.45",
    verified: true,
  },
  {
    id: 2,
    date: "2024-04-11",
    merchant: "Wework Office Inc.",
    detail: "Desk subscription",
    category: "Real Estate",
    amount: "$450.00",
    verified: false,
  },
  {
    id: 3,
    date: "2024-04-10",
    merchant: "Adobe Creative Cloud",
    detail: "Design tools team license",
    category: "Marketing",
    amount: "$89.99",
    verified: true,
  },
  {
    id: 4,
    date: "2024-04-09",
    merchant: "Stripe Payout Fees",
    detail: "Transaction processing",
    category: "Operations",
    amount: "$212.18",
    verified: false,
  },
];

export default function ExpenseTable({ onEditClick, onDeleteClick }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-zinc-950 overflow-hidden mb-8">
      <Table>
        <TableHeader className="bg-black text-white dark:bg-white dark:text-black">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-zinc-300 dark:text-zinc-600 font-bold tracking-widest uppercase text-xs">
              Date
            </TableHead>
            <TableHead className="text-zinc-300 dark:text-zinc-600 font-bold tracking-widest uppercase text-xs">
              Merchant / Detail
            </TableHead>
            <TableHead className="text-zinc-300 dark:text-zinc-600 font-bold tracking-widest uppercase text-xs">
              Category
            </TableHead>
            <TableHead className="text-zinc-300 dark:text-zinc-600 font-bold tracking-widest uppercase text-xs">
              Amount
            </TableHead>
            <TableHead className="text-zinc-300 dark:text-zinc-600 font-bold tracking-widest uppercase text-xs text-center">
              Status
            </TableHead>
            <TableHead className="text-right text-zinc-300 dark:text-zinc-600 font-bold tracking-widest uppercase text-xs pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {expense.date}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {expense.merchant}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {expense.detail}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-400"></div>
                  {expense.category}
                </div>
              </TableCell>
              <TableCell className="font-mono font-medium text-zinc-900 dark:text-white">
                {expense.amount}
              </TableCell>
              <TableCell className="text-center">
                {expense.verified ? (
                  <div className="inline-flex items-center justify-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                    <Sparkles className="h-3 w-3" />
                    AI-VERIFIED
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center px-2 py-0.5">
                    <div className="h-1.5 w-1.5 rounded-sm bg-zinc-300 dark:bg-zinc-700"></div>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 border-zinc-200 dark:border-zinc-800 shadow-sm"
                  >
                    <DropdownMenuItem
                      onClick={() => onEditClick?.(expense)}
                      className="cursor-pointer gap-2 py-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="font-medium">Edit Entry</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteClick?.(expense)}
                      className="cursor-pointer gap-2 py-2 text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="font-medium">Delete Entry</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 gap-4">
        <p className="text-sm text-muted-foreground">
          Showing 1 to 4 of 128 results
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 rounded-sm bg-black text-white dark:bg-white dark:text-black"
          >
            1
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground"
          >
            2
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground"
          >
            3
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
