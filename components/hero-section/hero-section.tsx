import { getNewProducts } from "@/lib/db/queries/products-queries";
import HeroCarousel from "./hero-carousel";

export default async function HeroSection() {
  const heroProducts = await getNewProducts();

  return (
    <section className="w-full mt-10 min-h-150 bg-black overflow-hidden flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-10 md:px-16 py-20 relative w-full">
        <HeroCarousel heroProducts={heroProducts} />
      </div>
    </section>
  );
}
