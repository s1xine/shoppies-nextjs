import CTA from "@/components/cta";
import Features from "@/components/features";
import Footer from "@/components/foorter";
import HeroSection from "@/components/hero-section/hero-section";
import HomeProducts from "@/components/products/home-products";
import ProductGridSkeleton from "@/components/products/product-grid-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <HeroSection />

      {/* FEATURES */}
      <Features />

      {/* PRODUCTS */}
      <section className="container mx-auto px-6 py-10 min-h-screen">
        <h2 className="text-6xl font-semibold text-center mt-16 mb-12">
          Products
        </h2>

        <div className="mt-12 pb-20 max-w-7xl mx-auto">
          <Suspense fallback={<ProductGridSkeleton isHome={true} />}>
            <HomeProducts />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <CTA />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
