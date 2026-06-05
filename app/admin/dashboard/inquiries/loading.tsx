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
      </div>

      {/* Inquiries Data Table Skeleton */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xs">
        {/* Table header */}
        <div className="p-5 border-b border-border bg-slate-50 flex items-center gap-4">
          <Skeleton className="h-6 w-32 rounded bg-slate-200" />
          <div className="flex-1 flex justify-end gap-2">
            <Skeleton className="h-8 w-24 rounded-md bg-slate-200" />
            <Skeleton className="h-8 w-24 rounded-md bg-slate-200" />
          </div>
        </div>
        
        {/* Table rows */}
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-2 flex-grow max-w-md">
                <Skeleton className="h-5 w-1/3 rounded bg-slate-200" />
                <Skeleton className="h-4 w-3/4 rounded bg-slate-100" />
              </div>
              <div className="flex flex-col items-end gap-2 w-32">
                 <Skeleton className="h-5 w-20 rounded-full bg-slate-200" />
                 <Skeleton className="h-4 w-16 rounded bg-slate-100" />
              </div>
              <Skeleton className="h-9 w-24 rounded-md bg-slate-200 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
