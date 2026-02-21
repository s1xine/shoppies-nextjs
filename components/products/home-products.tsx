import { Product } from "@/types/product";
import ProductsGrid from "./products-grid";
import { getHomepageProducts } from "@/lib/db/queries/products-queries";

export default async function HomeProducts() {
  const { bestSellers, newArrivals } = await getHomepageProducts();

  const products: Product[] = Array.from(
    new Map([...bestSellers, ...newArrivals].map((p) => [p.slug, p])).values(),
  );

  return <ProductsGrid products={products} isHome={true} />;
}
