"use client";

import React, { useEffect, useState } from "react";
import { ListingCard } from "@/components/listings";
import { useFavoritesStore } from "@/lib/store/favorites-store";
import { FacilityCategory } from "@/types";
import Link from "next/link";
import { Heart } from "lucide-react";

export interface FavoritesViewProps {
  allFacilities: {
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

export function FavoritesView({ allFacilities }: FavoritesViewProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { favoriteIds } = useFavoritesStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return <div className="animate-pulse space-y-4">
    <div className="h-48 bg-slate-200 rounded-xl" />
    <div className="h-48 bg-slate-200 rounded-xl" />
  </div>;

  const favoriteFacilities = allFacilities.filter(fac => favoriteIds.includes(fac.id));

  if (favoriteFacilities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-2xl border border-border/80 shadow-sm">
        <div className="h-16 w-16 bg-rose-50 text-rose-300 rounded-full flex items-center justify-center mb-4">
          <Heart className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No favorites yet</h3>
        <p className="text-slate-500 mt-2 max-w-sm">
          You haven't saved any facilities yet. Explore our directory and click the heart icon to save them here.
        </p>
        <Link 
          href="/listings"
          className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
        >
          Explore Facilities
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      {favoriteFacilities.map((facility) => (
        <ListingCard
          key={facility.id}
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
          variant="horizontal"
        />
      ))}
    </div>
  );
}
