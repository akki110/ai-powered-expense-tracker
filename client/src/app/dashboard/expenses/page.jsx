"use client";

import { useState } from "react";
import AIExpenseInput from "@/components/expenses/AIExpenseInput";
import ExpenseFilters from "@/components/expenses/ExpenseFilters";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ExpensesPage() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleAddClick = () => {
    setSelectedExpense(null);
    setIsExpenseModalOpen(true);
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleted", selectedExpense);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col pt-2 pb-12">
      <AIExpenseInput />
      <ExpenseFilters onAddClick={handleAddClick} />
      <ExpenseTable
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Add/Edit Modal */}
      <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
        <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl tracking-tight">
              {selectedExpense ? "Edit Expense Entry" : "New Expense Entry"}
            </DialogTitle>
            <DialogDescription>
              {selectedExpense
                ? "Update the details for this expense."
                : "Enter the details for your new expense manually."}
            </DialogDescription>
          </DialogHeader>
          <ExpenseForm
            initialData={selectedExpense}
            onClose={() => setIsExpenseModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-sm border-zinc-200 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl tracking-tight text-red-600 dark:text-red-500">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this expense? This action cannot
              be undone.
              {selectedExpense && (
                <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm font-medium flex flex-col gap-1">
                  <span className="text-zinc-900 dark:text-zinc-100">
                    {selectedExpense.merchant}
                  </span>
                  <span className="text-muted-foreground font-mono">
                    {selectedExpense.amount}
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-zinc-200 dark:border-zinc-800 rounded-sm"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-sm"
            >
              Delete Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
