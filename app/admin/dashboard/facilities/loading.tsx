import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-7xl mx-auto">
      {/* Title / Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-xl bg-slate-200" />
          <Skeleton className="h-4 w-72 rounded bg-slate-100" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl bg-slate-200" />
      </div>

      {/* Filters and Search */}
      <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs">
        <div className="flex gap-2 max-w-lg w-full">
          <Skeleton className="h-10 flex-1 rounded-xl bg-slate-100" />
          <Skeleton className="h-10 w-24 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Facilities Grid Skeleton */}
      <div className="grid grid-cols-1 gap-5">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="bg-surface border border-border rounded-2xl p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <Skeleton className="w-full lg:w-36 h-24 rounded-xl bg-slate-200 shrink-0" />
            <div className="flex-1 min-w-0 space-y-3 w-full">
              <Skeleton className="h-6 w-1/2 rounded bg-slate-200" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24 rounded bg-slate-100" />
                <Skeleton className="h-4 w-32 rounded bg-slate-100" />
              </div>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 justify-between lg:justify-end">
              <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
              <Skeleton className="h-9 w-20 rounded-md bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
