"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FilterBar } from "@/components/home/filter-bar";
import { ListingCard } from "@/components/listings";
import { MapWrapper } from "@/components/map/MapWrapper";
import { useMapStore } from "@/lib/store/map-store";
import { FacilityCategory } from "@/types";
import { cn } from "@/lib/utils";

export interface ListingsViewProps {
  initialFacilities: {
    id: string;
    title: string;
    imageUrl: string;
    categories: string[];
    category: FacilityCategory;
    insuranceAccepted: string;
    rating: number;
    reviewCount: number;
    priceMin: number;
    priceMax: number | null;
    bedsAvailable: number;
    distance?: number;
    slug?: string;
    city: string;
    state: string;
    position: [number, number];
  }[];
}

export function ListingsView({ initialFacilities }: ListingsViewProps) {
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  // Centralized Zustand Map state hooks
  const {
    selectedFacilityId,
    setSelectedFacilityId,
    setActiveMarkerId,
    setMapCenter,
    setMapZoom,
    resetMapState
  } = useMapStore();

  // Reset map store coordinates on route initialize
  useEffect(() => {
    resetMapState();
  }, [resetMapState]);

  const handleSelectFacilityFromMap = (id: string) => {
    setSelectedFacilityId(id);
    setActiveMarkerId(id);
    
    // Zoom in on select
    const target = initialFacilities.find((f) => f.id === id);
    if (target) {
      setMapCenter(target.position);
      setMapZoom(12);
    }

    // Scroll card list element smoothly
    const cardElement = document.getElementById(`listing-card-${id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Memoize listing cards to prevent heavy re-renders when map selection or mobileView state toggles
  const renderedListings = React.useMemo(() => {
    return initialFacilities.map((facility) => {
      return (
        <motion.div
          key={facility.id}
          id={`listing-card-${facility.id}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
          }}
        >
          <ListingCard
            id={facility.id}
            title={facility.title}
            imageUrl={facility.imageUrl}
            categories={facility.categories}
            insuranceAccepted={facility.insuranceAccepted}
            rating={facility.rating}
            reviewCount={facility.reviewCount}
            priceMin={facility.priceMin}
            priceMax={facility.priceMax || undefined}
            slug={facility.slug}
            bedsAvailable={facility.bedsAvailable}
            distance={facility.distance}
            city={facility.city}
            state={facility.state}
            isFeatured={facility.category === "Residential" || facility.category === "Detox"}
            position={facility.position}
          />
        </motion.div>
      );
    });
  }, [initialFacilities]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Filters bar */}
      <FilterBar />

      {/* Main split-panel content layout */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-8.5rem)] overflow-hidden relative">
        
        {/* Left Side: Scrollable Listing Cards (55% width on desktop) */}
        <div className={cn(
          "w-full lg:w-[55%] h-full overflow-y-auto px-4 md:px-6 py-6 border-r border-border no-scrollbar flex flex-col",
          mobileView === "map" ? "hidden lg:flex" : "flex"
        )}>
          
          {/* Header Stats */}
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
              Behavioral Health Programs Nationwide
            </h1>
            <p className="text-slate-500 text-sm mt-4">
              Showing {initialFacilities.length} certified facilities matching your criteria.
            </p>
          </div>

          {/* Cards Grid / Empty State */}
          {initialFacilities.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">No facilities found</h3>
              <p className="text-slate-500 mt-2 max-w-sm">
                We couldn't find any facilities matching your current search criteria. Try adjusting your filters or location.
              </p>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="flex flex-col gap-4 pb-20"
            >
              {renderedListings}
            </motion.div>
          )}
        </div>

        {/* Right Side: Sticky map container (45% width on desktop) */}
        <div className={cn(
          "w-full lg:w-[45%] h-full relative shrink-0 border-t lg:border-t-0 border-border",
          mobileView === "list" ? "hidden lg:block" : "block"
        )}>
          <MapWrapper
            markers={initialFacilities}
            activeMarkerId={selectedFacilityId}
            onClickMarker={handleSelectFacilityFromMap}
          />
        </div>

      </main>

      {/* Floating Mobile Toggle Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button
          onClick={() => setMobileView(mobileView === "list" ? "map" : "list")}
          className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold shadow-xl border border-slate-700 text-sm transition-all active:scale-95 cursor-pointer"
        >
          {mobileView === "list" ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Map View</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>List View</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ListingsView;
