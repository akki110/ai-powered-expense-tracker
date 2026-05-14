"use client";

import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import CategoryBreakdownChart from "@/components/dashboard/CategoryBreakdownChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col pt-2 pb-12 space-y-6">
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyTrendChart />
        </div>
        <div>
          <CategoryBreakdownChart />
        </div>
      </div>
      
      <RecentActivity />
    </div>
  );
}
