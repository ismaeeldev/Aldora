import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-xl bg-slate-200" />
        <Skeleton className="h-4 w-72 rounded bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Skeleton */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Skeleton className="h-5 w-5 rounded bg-slate-200" />
            <Skeleton className="h-5 w-40 rounded bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-28 rounded bg-slate-100" />
                <Skeleton className="h-4 w-40 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Security & Access Skeleton */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Skeleton className="h-5 w-5 rounded bg-slate-200" />
            <Skeleton className="h-5 w-36 rounded bg-slate-200" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded bg-slate-100" />
              <Skeleton className="h-16 w-full rounded bg-slate-100" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-32 rounded bg-slate-100" />
              <Skeleton className="h-6 w-36 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Database Metrics Skeleton */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs lg:col-span-3 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Skeleton className="h-5 w-5 rounded bg-slate-200" />
            <Skeleton className="h-5 w-48 rounded bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-28 rounded bg-slate-100" />
                <Skeleton className="h-4 w-36 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
