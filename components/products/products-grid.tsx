import ProductCard from "./product-card";
import { Product } from "@/types/product";

export default function ProductsGrid({
  products,
  isHome = false,
}: {
  products: Product[];
  isHome?: boolean;
}) {
  return (
    <div
      className={`${isHome ? "columns-2 sm:columns-3 lg:columns-5 gap-6 space-y-6 " : "columns-2 sm:columns-2 lg:columns-4 gap-6 space-y-6"}`}
    >
      {products.map((product, index) => (
        <div key={index} className="break-inside-avoid">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
