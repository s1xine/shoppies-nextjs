import ProductsGrid from "./products-grid";
import { getProductsByCategory } from "@/lib/db/queries/products-queries";

const ProductsByCategoryWrapper = async () => {
  const products = await getProductsByCategory(1);

  return (
    <>
      {products.length === 0 ? (
        <div className="border rounded-xl p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground text-sm">
            Try selecting another category or search something else.
          </p>
        </div>
      ) : (
        <ProductsGrid products={products} />
      )}
    </>
  );
};

export default ProductsByCategoryWrapper;
