import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* FEATURES */}
      <Features />

      {/* PRODUCTS */}
      <Products />

      {/* CTA */}
      <CTA />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
