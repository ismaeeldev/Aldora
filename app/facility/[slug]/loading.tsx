import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FacilityDetailLoading() {
  return (
    <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Gallery Skeleton: matching 1 large + 4 small underneath layout */}
      <div className="space-y-2 animate-pulse">
        {/* Main Cover Skeleton */}
        <Skeleton className="w-full aspect-[21/9] rounded-xl bg-slate-200/80" />
        
        {/* Bottom 4 Small Image Skeletons */}
        <div className="grid grid-cols-4 gap-2 w-full aspect-[32/9]">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-full h-full rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>

      {/* 2-Column Split: Info Left, Contact Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        {/* Left Column (Info details, 2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <Skeleton className="w-2/3 h-10 rounded-xl bg-slate-200" />
            <Skeleton className="w-1/3 h-4 rounded-lg bg-slate-100" />
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <Skeleton className="w-full h-36 rounded-2xl bg-slate-100" />
            <Skeleton className="w-full h-28 rounded-2xl bg-slate-100" />
          </div>
        </div>

        {/* Right Column (Contact sidebar, 1/3 width) */}
        <div className="space-y-6">
          <Skeleton className="w-full h-80 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </main>
  );
}
