import React from "react";
import { MapPin } from "lucide-react";
import { FilterBar } from "@/components/home/filter-bar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <FilterBar />
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-8.5rem)] overflow-hidden">
        <div className="w-full lg:w-[55%] h-full p-6 border-r border-border overflow-y-auto no-scrollbar">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-8 w-64 rounded-xl bg-slate-200" />
            <Skeleton className="h-4 w-48 rounded-lg bg-slate-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border p-4 rounded-2xl bg-surface space-y-4 shadow-xs">
                {/* Image placeholder */}
                <Skeleton className="w-full h-36 rounded-xl bg-slate-200" />
                {/* Text lines */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-2/3 rounded-lg bg-slate-200" />
                  <Skeleton className="h-4 w-1/2 rounded bg-slate-100" />
                  <Skeleton className="h-8 w-full rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[45%] h-full bg-slate-50 flex items-center justify-center border-l border-border/50">
          <div className="flex flex-col items-center text-slate-400 gap-3">
            <MapPin className="h-10 w-10 animate-bounce text-primary/70" />
            <p className="font-semibold text-xs tracking-wider uppercase text-slate-500 animate-pulse">Loading listings map...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
