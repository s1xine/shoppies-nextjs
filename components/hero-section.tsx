import HeroCarousel from "./hero-carousel";
import { getProducts } from "@/app/actions/products";

export default async function HeroSection() {
  const products = await getProducts();

  const seed = Math.floor(Date.now() / (1000 * 60 * 10));

  // pseudo shuffle using seed (SSR safe)
  const shuffled = [...products]
    .map((p, i) => ({
      sort: (i + seed) % products.length,
      value: p,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  const heroProducts = shuffled.slice(0, 4).map((p) => ({
    title: p.title,
    subtitle: "Premium quality product",
    price: `₹${Math.round(p.price * 85)}`,
    image: p.image,
  }));

  return (
    <section className="w-full mt-10 min-h-150 bg-black overflow-hidden flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-10 md:px-16 py-20 relative w-full">
        <HeroCarousel products={heroProducts} />
      </div>
    </section>
  );
}
