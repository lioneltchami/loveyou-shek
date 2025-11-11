"use client";

import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import Timeline from "@/components/Timeline";
import PhotoGalleryEnhanced from "@/components/PhotoGalleryEnhanced";
import Professional from "@/components/Professional";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";

// Dynamic imports for components containing Firebase (heavy)
const VirtualCandle = dynamic(() => import("@/components/VirtualCandle"), {
  loading: () => (
    <section className="py-20 bg-gradient-to-b from-white to-[#f5f3f0]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          Light a Candle
        </h2>
        <p className="text-gray-600 mb-12">Loading...</p>
      </div>
    </section>
  ),
});

const TestimonialsEnhanced = dynamic(() => import("@/components/TestimonialsEnhanced"), {
  loading: () => (
    <section className="py-20 bg-gradient-to-b from-[#f5f3f0] to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          Share Your Memories
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Loading testimonials...
        </p>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Inline skeleton loaders to avoid import issues */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});

const MemorialDonation = dynamic(() => import("@/components/MemorialDonation"), {
  loading: () => (
    <section className="py-20 bg-gradient-to-b from-[#f5f3f0] to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#8b7355]">
          Honor Her Memory
        </h2>
        <p className="text-gray-600">Loading...</p>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#8b7355] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#c4a585] transition-all"
      >
        Skip to main content
      </a>

      <LanguageToggle />

      <main id="main-content" className="min-h-screen">
        <Hero />
        <Biography />
        <Timeline />
        <Professional />
        <PhotoGalleryEnhanced />
        <VirtualCandle />
        <TestimonialsEnhanced />
        <MemorialDonation />
        <Footer />
      </main>
    </>
  );
}
