"use client";

import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import CategoryBreakdownChart from "@/components/dashboard/CategoryBreakdownChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useDashboard } from "@/hooks/useDashboard";
import Loader from "@/components/common/Loader";

export default function DashboardPage() {
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col pt-2 pb-12 space-y-6">
      <SummaryCards summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyTrendChart monthlyTrend={data.monthlyTrend} />
        </div>
        <div>
          <CategoryBreakdownChart chartData={data.categoryBreakdown} />
        </div>
      </div>

      <RecentActivity activities={data.recentActivity} />
    </div>
  );
}
