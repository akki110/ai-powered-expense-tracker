"use client";

import ExportSettings from "@/components/export/ExportSettings";
import RecentExports from "@/components/export/RecentExports";

import { useExports } from "@/hooks/useExports";

export default function ExportPage() {
  const { recentExports, loading, exporting, handleGenerateExport } = useExports();

  return (
    <div className="w-full flex flex-col pt-2 pb-12">
      <ExportSettings onExport={handleGenerateExport} exporting={exporting} />
      <RecentExports exportsList={recentExports} loading={loading} />
    </div>
  );
}
