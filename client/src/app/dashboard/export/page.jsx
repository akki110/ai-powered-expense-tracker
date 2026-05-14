"use client";

import ExportSettings from "@/components/export/ExportSettings";
import RecentExports from "@/components/export/RecentExports";

export default function ExportPage() {
  return (
    <div className="w-full flex flex-col pt-2 pb-12">
      <ExportSettings />
      <RecentExports />
    </div>
  );
}
