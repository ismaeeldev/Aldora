import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-7xl mx-auto">
      {/* Admin Title Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-xl bg-slate-200" />
          <Skeleton className="h-4 w-72 rounded bg-slate-100" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl bg-slate-200" />
      </div>

      {/* Metrics Row (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface border border-border p-6 rounded-2xl space-y-3">
            <Skeleton className="h-4 w-28 rounded bg-slate-100" />
            <Skeleton className="h-8 w-16 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Data Table Skeleton */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="p-5 border-b border-border bg-slate-50/50 flex items-center justify-between">
          <Skeleton className="h-6 w-36 rounded bg-slate-200" />
          <Skeleton className="h-9 w-44 rounded-lg bg-slate-150" />
        </div>
        
        {/* Table rows */}
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4.5 w-1/3 rounded bg-slate-200" />
                <Skeleton className="h-3.5 w-1/4 rounded bg-slate-100" />
              </div>
              <Skeleton className="h-8 w-20 rounded-lg bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
