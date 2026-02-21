import { getNewProducts } from "@/lib/db/queries/products-queries";
import HeroCarousel from "./hero-carousel";

const HeroSectionFetching = async () => {
  const heroProducts = await getNewProducts();

  return <HeroCarousel heroProducts={heroProducts} />;
};

export default HeroSectionFetching;
