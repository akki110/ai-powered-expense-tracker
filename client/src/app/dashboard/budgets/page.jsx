"use client";

import BudgetAllocations from "@/components/budgets/BudgetAllocations";
import BudgetSummaryCard from "@/components/budgets/BudgetSummaryCard";
import CreateBudgetForm from "@/components/budgets/CreateBudgetForm";
import IntegrityLogs from "@/components/budgets/IntegrityLogs";
import { useBudgets } from "@/hooks/useBudgets";

export default function BudgetsPage() {
  const { budgets, loading, addBudget, removeBudget } = useBudgets();
  return (
    <div className="w-full flex flex-col pt-2 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
        
        {/* Left Column - Allocations List */}
        <div className="xl:col-span-2">
          <BudgetAllocations budgets={budgets} loading={loading} onDelete={removeBudget} />
        </div>

        {/* Right Column - Controls and Summary */}
        <div className="flex flex-col space-y-6">
          <BudgetSummaryCard budgets={budgets} />
          <CreateBudgetForm onSubmit={addBudget} />
          <IntegrityLogs />
        </div>

      </div>
    </div>
  );
}