import { Suspense } from "react";
import HeroCarouselSkeleton from "./hero-carousel-skeleton";
import HeroSectionFetching from "./hero-section-fetching";

export default function HeroSection() {
  return (
    <section className="w-full bg-black overflow-hidden flex justify-center items-center min-h-screen lg:min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20 relative w-full">
        <Suspense fallback={<HeroCarouselSkeleton />}>
          <HeroSectionFetching />
        </Suspense>
      </div>
    </section>
  );
}
