import { getProducts, Product } from "@/app/actions/products";
import ProductCard from "./product-card";
import ProductHydrator from "./ProductHydrator";

const ProductsGrid = async () => {
  const products = await getProducts(); // SSR fetch here

  return (
    <div className="mt-12">
      {/* hydrate zustand globally */}
      <ProductHydrator products={products} />

      {/* masonry */}
      <div className="columns-2 sm:columns-3 lg:columns-5 gap-6 space-y-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
