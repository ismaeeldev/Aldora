import { Hero } from "@/components/home/hero";
import { ListingCard } from "@/components/listings";
import { MapWrapper } from "@/components/map/MapWrapper";
import { prisma } from "@/lib/db/prisma";
import Script from "next/script";
import { Search, ShieldCheck, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Query featured facilities from Neon
  let featuredDbFacilities: any[] = [];
  try {
    featuredDbFacilities = await prisma.facility.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        images: true,
        categories: true,
        reviews: true,
      },
      take: 3,
    });
  } catch (error) {
    console.error("Prisma query failed on Homepage:", error);
  }

  const listings = featuredDbFacilities.map((fac) => {
    const primaryImage = fac.images.find((img: { isPrimary: boolean }) => img.isPrimary) || fac.images[0];
    const totalRating = fac.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0);
    const rating = fac.reviews.length > 0 ? Number((totalRating / fac.reviews.length).toFixed(1)) : 4.8;
    const reviewCount = fac.reviews.length;

    return {
      id: fac.id,
      title: fac.name,
      imageUrl: primaryImage ? primaryImage.url : "/images/wellness_hero_bg.png",
      categories: fac.categories.map((c: { name: string }) => c.name),
      rating,
      reviewCount,
      priceMin: fac.priceMin,
      priceMax: fac.priceMax || undefined,
      slug: fac.slug,
      bedsAvailable: fac.bedsAvailable,
      city: fac.city,
      state: fac.state,
      isFeatured: fac.isFeatured,
      position: fac.latitude && fac.longitude ? [fac.latitude, fac.longitude] as [number, number] : undefined,
    };
  });

  // Query all map markers from Neon
  let mapDbFacilities: any[] = [];
  try {
    mapDbFacilities = await prisma.facility.findMany({
      take: 10,
    });
  } catch (error) {
    console.error("Prisma map query failed on Homepage:", error);
  }

  const mapMarkers = mapDbFacilities.map((fac) => ({
    id: fac.id,
    position: [fac.latitude || 33.5794, fac.longitude || -112.1124] as [number, number],
    title: fac.name,
    price: fac.priceMin,
    bedsAvailable: fac.bedsAvailable,
    city: `${fac.city}, ${fac.state}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Liora Marketplace",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://liora.com",
    description: "Behavioral health platform connecting you to trusted care.",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id="schema-org-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section */}
      <main className="flex-grow bg-gradient-to-b from-cyan-50/60 via-white to-sky-50/60">
        <Hero />

        {/* Reusable Featured Listing Cards Grid */}
        <section className="py-24 md:py-32 px-4 md:px-8 border-t border-border/80">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-wider uppercase mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Handpicked Recoveries
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Featured Treatment Facilities
                </h2>
              </div>
              <p className="text-slate-500 text-xs md:text-sm max-w-md font-light leading-relaxed">
                Verified high-quality rehabilitation and mental health resorts offering immediate intake, comprehensive insurance matches, and Joint Commission accreditations.
              </p>
            </div>

            {/* Grid structure (1 col mobile, 2 col tablet, 3 col desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing, idx) => (
                <FadeIn key={listing.id} delay={idx * 0.1}>
                  <ListingCard {...listing} variant="vertical" />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Leaflet Map Section */}
        <section className="py-24 md:py-32 px-4 md:px-8 border-t border-border/60 relative overflow-hidden">
          {/* Subtle decorative mesh */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-100/10 blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <FadeIn className="text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-[10px] font-bold tracking-wider uppercase mb-3">
                  Geographic Intake Match
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Explore Care Nationwide
                </h2>
              </FadeIn>
              <p className="text-slate-550 text-xs md:text-sm max-w-md font-light">
                Zoom and interact with individual facility pins to view immediate bed statuses, contact info, and localized outpatient programs.
              </p>
            </div>

            {/* Map Container */}
            <FadeIn delay={0.2} className="h-[480px] w-full rounded-3xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,118,255,0.15)] transition-all duration-500 overflow-hidden relative ring-1 ring-slate-900/5 bg-white/50 backdrop-blur-sm">
              <MapWrapper
                center={[33.5794, -112.1124]} // Center of Phoenix, AZ area
                zoom={10}
                markers={mapMarkers}
              />
            </FadeIn>
          </div>
        </section>

        {/* Feature grid to showcase luxury medical brand style */}
        <section className="py-24 md:py-32 px-4 md:px-8 border-t border-border/80">
          <div className="max-w-7xl mx-auto text-center">
            <FadeIn className="space-y-4">
              <span className="text-primary text-[11px] uppercase font-bold tracking-widest">A Modern Directory</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Simplifying the search for recovery
              </h2>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                Connecting patients, families, and healthcare providers to verified and trustworthy treatment clinics with transparent program details.
              </p>
            </FadeIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Detailed Listings",
                  desc: "Filter by specific therapies, inpatient programs, accepted insurance networks, and wellness accommodations.",
                  icon: Search
                },
                {
                  title: "Accredited Partners",
                  desc: "We verify active state licensing, JCAHO credentials, and physical facility safety to offer complete peace of mind.",
                  icon: ShieldCheck
                },
                {
                  title: "Direct Inquiry",
                  desc: "Connect directly with certified facility coordinators securely and privately through HIPAA-encrypted channels.",
                  icon: MessageCircle
                }
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <FadeIn key={idx} delay={0.1 + idx * 0.1} className="h-full">
                    <div className="p-8 md:p-10 rounded-3xl h-full border border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 text-left group flex flex-col justify-between relative overflow-hidden">
                      {/* Subtle gradient hover blob inside card */}
                      <div className="absolute -inset-24 bg-gradient-to-r from-primary/0 via-primary/5 to-teal-400/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
                      
                      <div className="relative z-10">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300">
                          <IconComponent className="h-5.5 w-5.5" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
