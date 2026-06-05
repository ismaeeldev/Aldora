"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Handle scroll for sticky glassmorphism effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Hide navbar on admin paths
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 w-full transition-all duration-300 ease-in-out border-b bg-gradient-to-r from-cyan-50/90 via-white/90 to-sky-50/90 backdrop-blur-md border-border/50 shadow-sm"
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 md:px-8">
          
          {/* Left Side: Navigation Links */}
          <div className="flex flex-1 items-center justify-start gap-6">
            <Link 
              href="/listings"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-primary transition-colors cursor-pointer"
            >
              <span>Find Housing</span>
              <Search className="h-4 w-4 text-slate-500" />
            </Link>
            
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors cursor-pointer focus:outline-none">
                <span>Care Options</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              
              {/* Dropdown Menu matching Screenshot 2 */}
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-surface shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {[
                  { name: "Detox (Medical Detox)", val: "detox" },
                  { name: "Residential Treatment", val: "inpatient" },
                  { name: "PHP (Partial Hospitalization)", val: "outpatient" },
                  { name: "IOP (Intensive Outpatient)", val: "outpatient" },
                  { name: "Mental Health Treatment", val: "therapy" },
                  { name: "Dual Diagnosis", val: "therapy" },
                  { name: "Sober Living", val: "telehealth" }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={`/listings?treatmentType=${item.val}`}
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-muted transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex flex-none items-center justify-center">
            <Link href="/" aria-label="Home" className="flex items-center">
              <Image 
                src="/Liora-Logo.png" 
                alt="Liora Logo" 
                width={120} 
                height={36} 
                className="object-contain" 
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Right Side: Actions */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-6">
              <Link 
                href="/favorites"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-500 transition-colors"
              >
                <Heart className="h-4 w-4" />
                Saved
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="flex lg:hidden p-2 text-slate-600 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
          >
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-surface shadow-xl border-l border-border flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-semibold text-slate-900">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {/* Mobile Links */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/listings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-base font-medium text-slate-700 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Search className="h-5 w-5" />
                    Find Housing
                  </Link>
                  <Link
                    href="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-base font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    Saved Facilities
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
