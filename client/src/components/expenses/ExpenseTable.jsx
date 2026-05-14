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
import Loader from "../common/Loader";

export default function ExpenseTable({
  expenses = [],
  loading,
  pagination,
  updateFilter,
  onEditClick,
  onDeleteClick,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
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
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                <Loader />
              </TableCell>
            </TableRow>
          ) : expenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No expenses found.
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {formatDate(expense.date)}
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
                  {formatCurrency(expense.amount)}
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
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {expenses?.length || 0} of {pagination?.total || 0} results
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateFilter("page", (pagination?.page || 1) - 1)}
            disabled={!pagination || pagination.page <= 1}
            className="h-8 w-8 rounded-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button
            variant="default"
            className="h-8 min-w-[32px] px-2 rounded-sm bg-black text-white dark:bg-white dark:text-black"
          >
            {pagination?.page || 1}
          </Button>

          <span className="text-sm text-muted-foreground mx-1">
            of {pagination?.totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => updateFilter("page", (pagination?.page || 1) + 1)}
            disabled={!pagination || pagination.page >= pagination.totalPages}
            className="h-8 w-8 rounded-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
