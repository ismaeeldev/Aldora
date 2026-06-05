"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, X, SlidersHorizontal, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", name: "All Programs", placeholder: "Enter city, state, zip or facility name..." },
  { id: "rehab", name: "Inpatient Rehab", placeholder: "Search inpatient rehab clinics..." },
  { id: "detox", name: "Detox Programs", placeholder: "Search medical detox centers..." },
  { id: "mental", name: "Mental Health", placeholder: "Search psychiatric or trauma facilities..." },
  { id: "outpatient", name: "Outpatient Care", placeholder: "Search partial hospitalization & outpatient..." },
];

const HERO_INSURANCES = [
  { label: "Aetna", value: "aetna" },
  { label: "Blue Cross", value: "bluecross" },
  { label: "Cigna", value: "cigna" },
  { label: "UnitedHealth", value: "united" },
  { label: "Humana", value: "humana" },
  { label: "Medicaid", value: "medicaid" },
];

const HERO_AMENITIES = [
  { label: "Private Rooms", value: "private-room" },
  { label: "Chef-prepared Meals", value: "chef-meals" },
  { label: "Pool & Spa", value: "pool" },
  { label: "Gym / Fitness Center", value: "gym" },
  { label: "Pet Friendly", value: "pet-friendly" },
  { label: "Holistic Therapy", value: "holistic" },
];

const TRUST_TAGS = [
  { icon: ShieldCheck, text: "HIPAA Compliant & Confidential" },
  { icon: Heart, text: "Joint Commission Accredited Facilities" },
  { icon: Sparkles, text: "Luxury & Executive Amenity Matches" },
];

export function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const activePlaceholder = TABS.find((t) => t.id === activeTab)?.placeholder || TABS[0].placeholder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeTab !== "all") params.set("category", activeTab);
    
    if (selectedInsurances.length > 0) {
      params.set("insurance", selectedInsurances.join(","));
    }
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","));
    }
    
    router.push(`/listings?${params.toString()}`);
  };

  const toggleInsurance = (insurance: string) => {
    setSelectedInsurances((prev) =>
      prev.includes(insurance) ? prev.filter((i) => i !== insurance) : [...prev, insurance]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedInsurances([]);
    setSelectedAmenities([]);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 md:py-32">
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-cyan-50/40 via-slate-50/50 to-sky-100/40 overflow-hidden">
        {/* Animated glowing blobs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full bg-teal-200/30 blur-[90px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-sky-300/20 blur-[80px] pointer-events-none"
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#23b5e808_1px,transparent_1px),linear-gradient(to_bottom,#23b5e808_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center"
      >
        
        {/* Top Accent Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wide uppercase shadow-sm"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>Premier Behavioral Health Directory</span>
        </motion.div>

        {/* H1 Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 max-w-3xl leading-[1.1]"
        >
          Find Healing. <br className="sm:hidden" />
          <span className="text-primary drop-shadow-sm">
            Discover Trusted Care.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-base md:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed"
        >
          Compare verified treatment facilities, luxury recovery programs, and dedicated rehab specialists near you.
        </motion.p>

        {/* Zillow-Style Search Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl mt-10"
        >
          {/* Tabs Navigation (Horizontal scrolling on small screens) */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-1 mb-2 bg-surface/80 backdrop-blur-md p-1 rounded-t-xl max-w-fit mx-auto border border-border shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Combined Search Bar & Options Panel */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-white/60 overflow-hidden text-left ring-1 ring-slate-900/5">
            <form onSubmit={handleSearch} className="p-3 md:p-4 flex flex-col md:flex-row gap-3">
              {/* Input wrapper */}
              <div className="relative flex-1 flex items-center h-12 bg-muted/40 hover:bg-muted/70 focus-within:bg-surface focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 rounded-xl transition-all border border-border/50">
                <MapPin className="absolute left-4 h-5 w-5 text-muted-foreground/80 shrink-0" />
                <input
                  type="text"
                  placeholder={activePlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full pl-11 pr-10 bg-transparent text-sm md:text-base outline-none text-slate-800 placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1 rounded-full hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Advanced Filters Toggle */}
                <Button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex-1 md:flex-initial h-12 px-5 rounded-full font-medium border border-border flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]",
                    showFilters
                      ? "bg-secondary text-secondary-foreground border-teal-200 hover:bg-secondary/80 shadow-sm"
                      : "bg-surface text-slate-700 hover:bg-slate-50 hover:shadow-sm"
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {(selectedInsurances.length > 0 || selectedAmenities.length > 0) && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full font-bold">
                      {selectedInsurances.length + selectedAmenities.length}
                    </span>
                  )}
                </Button>

                {/* Primary Search Button */}
                <Button
                  type="submit"
                  className="relative group flex-1 md:flex-initial h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] overflow-hidden shadow-[0_0_20px_rgba(0,118,255,0.4)]"
                >
                  {/* Subtle sweep animation on button */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                  <Search className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Search</span>
                </Button>
              </div>
            </form>

            {/* Advanced Filters Expandable Drawer/Section */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="border-t border-border/80 bg-muted/20"
                >
                  <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Insurance Filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1">
                        <span>Accepted Insurances</span>
                        <span className="text-xs text-muted-foreground font-normal">(Select all that apply)</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {HERO_INSURANCES.map((insurance) => (
                          <button
                            key={insurance.value}
                            type="button"
                            onClick={() => toggleInsurance(insurance.value)}
                            className={cn(
                              "px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer",
                              selectedInsurances.includes(insurance.value)
                                ? "bg-primary/10 border-primary text-primary font-medium"
                                : "bg-surface border-border text-slate-600 hover:bg-muted"
                            )}
                          >
                            {insurance.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Luxury Amenities Filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1">
                        <span>Luxury Amenities</span>
                        <span className="text-xs text-muted-foreground font-normal">(Select all that apply)</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {HERO_AMENITIES.map((amenity) => (
                          <button
                            key={amenity.value}
                            type="button"
                            onClick={() => toggleAmenity(amenity.value)}
                            className={cn(
                              "px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer",
                              selectedAmenities.includes(amenity.value)
                                ? "bg-primary/10 border-primary text-primary font-medium"
                                : "bg-surface border-border text-slate-600 hover:bg-muted"
                            )}
                          >
                            {amenity.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar inside Filters drawer */}
                  <div className="px-4 py-3 bg-muted/40 border-t border-border flex items-center justify-between">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Clear All Filters
                    </button>
                    <Button
                      type="button"
                      onClick={() => setShowFilters(false)}
                      className="h-8 px-4 text-xs bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Helper Links / Suggested searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-1.5 text-xs md:text-sm font-medium"
        >
          <span className="text-slate-500">Popular Searches:</span>
          {["Executive Detox", "Dual Diagnosis Rehab", "Outpatient PHP", "Holistic Healing"].map((item) => (
            <button
              key={item}
              onClick={() => setSearchQuery(item)}
              className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {TRUST_TAGS.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <tag.icon className="h-3 w-3" />
              </div>
              <span className="text-xs font-bold tracking-wide">{tag.text}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
