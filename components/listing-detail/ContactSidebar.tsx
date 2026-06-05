"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { InquiryForm } from "@/components/inquiry-form";

export interface ContactSidebarProps {
  facilityId: string;
  bedsAvailable?: number;
  priceMin?: number; // Used for mobile only now, or we can just ignore it
}

export function ContactSidebar({
  facilityId,
  bedsAvailable = 0,
}: ContactSidebarProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      {/* 1. Desktop & Mobile Inline Layout */}
      <Card id="contact-form-section" className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden mb-24 lg:mb-0">
        <CardContent className="p-0">
          
          {/* Urgency Banner */}
          <div className="bg-rose-50 border-b border-rose-100 p-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xl mb-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              {bedsAvailable} BEDS AVAILABLE TODAY
            </div>
            <span className="text-xs text-rose-600 font-medium uppercase tracking-wide">
              Immediate Placement Available
            </span>
          </div>

          {/* Form directly visible on desktop */}
          <div className="p-6">
            <InquiryForm facilityId={facilityId} />
          </div>

          <div className="px-6 pb-6 pt-0 space-y-4 border-t border-border mt-2">
            {/* Secondary Save Button */}
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              aria-pressed={isSaved}
              className="mt-6 w-full h-12 rounded-xl border border-border bg-surface hover:bg-muted text-slate-700 font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <motion.div
                animate={{ scale: isSaved ? [1, 1.25, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`h-4.5 w-4.5 transition-colors ${
                    isSaved ? "fill-rose-500 text-rose-500" : "text-slate-600"
                  }`}
                />
              </motion.div>
              <span>{isSaved ? "Saved to Favorites" : "Save Listing"}</span>
            </button>
          </div>

        </CardContent>
      </Card>

      {/* 2. Mobile Fixed Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border p-3 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-between gap-3 select-none">
        <div className="flex flex-col">
          <div className="text-rose-700 font-bold text-[11px] flex items-center gap-1.5 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            {bedsAvailable} BEDS TODAY
          </div>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Immediate Intake</span>
        </div>
        <button 
          onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="h-12 flex-1 max-w-[200px] bg-primary text-white font-bold uppercase tracking-wide rounded-lg shadow-sm hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          CONTACT
        </button>
      </div>
    </>
  );
}

export default ContactSidebar;
