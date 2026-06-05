"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Heart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  // Only show sidebar on listings directory page
  if (pathname !== "/listings") {
    return null;
  }

  return (
    <aside className="w-16 border-r border-border bg-surface flex flex-col items-center py-6 gap-6 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-40 hidden sm:flex">
      {/* Favorites */}
      <button className="group flex flex-col items-center gap-1.5 w-full text-slate-500 hover:text-primary transition-colors cursor-pointer focus-visible:outline-none">
        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
          <Heart className="h-5 w-5 text-slate-600 group-hover:text-primary transition-colors" />
        </div>
        <span className="text-[10px] font-bold tracking-tight uppercase">Favorites</span>
      </button>
    </aside>
  );
}
