import { Product } from "@/types/product";
import ProductsGrid from "./products-grid";
import { getHomepageProducts } from "@/lib/db/queries/products-queries";

export default async function HomeProducts() {
  const { bestSellers, newArrivals } = await getHomepageProducts();
  const products: Product[] = [...bestSellers, ...newArrivals];

  return (
    <div className="mt-12 pb-20 max-w-7xl mx-auto">
      <ProductsGrid products={products} isHome={true} />
    </div>
  );
}
