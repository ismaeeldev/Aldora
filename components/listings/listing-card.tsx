"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Clock } from "lucide-react";
import { ReviewStars } from "@/components/shared/review-stars";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMapStore } from "@/lib/store/map-store";
import { useFavoritesStore } from "@/lib/store/favorites-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface ListingCardProps {
  id: string;
  slug?: string;
  title: string;
  imageUrl: string;
  categories: string[];
  insuranceAccepted?: string;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax?: number;
  bedsAvailable: number;
  distance?: number;
  city: string;
  state: string;
  isFeatured?: boolean;
  position?: [number, number];
  variant?: "vertical" | "horizontal";
}

export function ListingCard({
  id,
  title,
  imageUrl,
  categories,
  insuranceAccepted = "In-Network / Most Insurances",
  rating,
  reviewCount,
  priceMin,
  priceMax,
  bedsAvailable,
  distance,
  city,
  state,
  position,
  slug,
  variant = "horizontal",
}: ListingCardProps) {
  const router = useRouter();
  
  // Hydration safe favorites
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isSaved = isHydrated ? isFavorite(id) : false;

  const { 
    selectedFacilityId, 
    setSelectedFacilityId,
    setHoveredFacilityId,
    setActiveMarkerId,
    setMapCenter,
    setMapZoom
  } = useMapStore();

  const isSelected = selectedFacilityId === id;
  const isHorizontal = variant === "horizontal";

  const handleCardClick = () => {
    setSelectedFacilityId(id);
    setActiveMarkerId(id);
    if (position) {
      setMapCenter(position);
      setMapZoom(12);
    }
  };

  const careType = categories[0] || "Treatment Center";
  
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl h-full"
      onMouseEnter={() => setHoveredFacilityId(id)}
      onMouseLeave={() => setHoveredFacilityId(null)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <Card className={cn(
        "group relative overflow-hidden bg-surface transition-all duration-300 cursor-pointer rounded-2xl border border-border shadow-xs hover:shadow-xl hover:border-primary/30 hover:shadow-primary/5 p-0 h-full",
        isSelected && "border-primary ring-1 ring-primary shadow-md shadow-primary/5",
        isHorizontal ? "flex flex-col sm:flex-row" : "flex flex-col"
      )}>
        
        {/* 1. Image */}
        <div className={cn(
          "relative overflow-hidden bg-slate-100 shrink-0",
          isHorizontal ? "h-48 sm:h-auto sm:w-[35%] lg:w-[30%]" : "h-44 w-full"
        )}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Floating action buttons on top of image */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-end z-10 select-none">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(id);
              }}
              className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 transition-all shadow-sm cursor-pointer focus-visible:outline-none"
              aria-label="Save community"
            >
              <Heart className={cn("h-3.5 w-3.5 transition-colors", isSaved ? "fill-rose-500 text-rose-500" : "text-slate-500")} />
            </button>
          </div>
        </div>

        {/* Card Content Details */}
        <CardContent className={cn(
          "flex flex-col flex-1 p-4 gap-1.5",
          isHorizontal && "sm:p-5 sm:gap-2 justify-center"
        )}>
          
          {/* Header Row: Title & Rating */}
          <div className="flex items-start justify-between gap-3">
            <Link 
              href={`/facility/${slug || id}`}
              className="block group-hover:text-primary transition-colors flex-1 min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={cn(
                "font-extrabold text-sky-850 leading-tight truncate",
                isHorizontal ? "text-base md:text-lg" : "text-sm md:text-base"
              )}>
                {title}
              </h3>
            </Link>
            
            <div className="flex items-center shrink-0 text-amber-500 gap-0.5">
              <ReviewStars rating={rating} reviewCount={reviewCount} showText={false} />
              <span className="text-xs font-bold text-slate-800 ml-1">{rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400 font-medium">({reviewCount})</span>
            </div>
          </div>

          {/* Subtitle / Categories */}
          <div className="text-[11px] font-bold text-slate-550 uppercase tracking-wide">
            {careType} • {city}, {state}
          </div>

          {/* Features Grid */}
          <div className={cn(
            "grid gap-3 text-[11px] text-slate-600 border-t border-border/80 pt-2.5 mt-1 select-none",
            isHorizontal ? "grid-cols-2" : "grid-cols-2"
          )}>
            {/* Left Column: Core Features */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                <span className="truncate">{insuranceAccepted}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                <span className="truncate">Same-day admission</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                <span className="truncate">Male / Female / Co-ed</span>
              </div>
            </div>

            {/* Right Column: Dynamic Status Indicators */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="truncate">Beds Available: {bedsAvailable}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Response: &lt; 1 hour</span>
              </div>
              
              {distance !== undefined && (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Distance: {distance.toFixed(1)} mi</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Row: Pricing & Actions */}
          <div className="flex items-center justify-between border-t border-border/80 pt-2.5 mt-auto">
            <div className="text-[11px] font-bold text-slate-500">
              Private pay range: <span className="text-slate-900">${priceMin} - ${priceMax || 600}/Week</span>
            </div>
            
            <Button 
              size="sm" 
              className="h-8 text-[10px] font-bold uppercase tracking-wider py-0 px-3 bg-primary text-white hover:bg-primary-hover rounded-md shadow-sm border-none cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/facility/${slug || id}`);
              }}
            >
              Check Availability
            </Button>
          </div>

        </CardContent>
      </Card>
    </motion.article>
  );
}

