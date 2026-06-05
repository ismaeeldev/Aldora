import React from "react";
import { prisma } from "@/lib/db/prisma";
import { FacilityCategory } from "@/types";
import { FavoritesView } from "./favorites-view";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  let dbFacilities: any[] = [];
  
  try {
    dbFacilities = await prisma.facility.findMany({
      include: {
        images: true,
        categories: true,
        reviews: true,
      },
    });
  } catch (error) {
    console.error("Prisma query failed on Favorites page:", error);
  }

  const mappedFacilities = dbFacilities.map((fac) => {
    const primaryImage = fac.images.find((img: { isPrimary: boolean }) => img.isPrimary) || fac.images[0];
    const totalRating = fac.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0);
    const rating = fac.reviews.length > 0 ? Number((totalRating / fac.reviews.length).toFixed(1)) : 4.8;
    const reviewCount = fac.reviews.length;
    const catName = (fac.categories[0]?.name || "Residential") as FacilityCategory;

    return {
      id: fac.id,
      title: fac.name,
      imageUrl: primaryImage ? primaryImage.url : "/images/wellness_hero_bg.png",
      categories: fac.categories.map((c: { name: string }) => c.name),
      category: catName,
      insuranceAccepted: fac.insuranceAccepted,
      rating,
      reviewCount,
      priceMin: fac.priceMin,
      priceMax: fac.priceMax,
      slug: fac.slug,
      bedsAvailable: fac.bedsAvailable,
      city: fac.city,
      state: fac.state,
      position: [fac.latitude || 33.5794, fac.longitude || -112.1124] as [number, number],
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Saved Facilities</h1>
        <p className="text-slate-500 mb-8">Access all the communities you have marked as a favorite.</p>
        <FavoritesView allFacilities={mappedFacilities} />
      </div>
    </div>
  );
}
