import ProductCardSkeleton from "./product-card-skeleton";

const ProductGridSkeleton = ({ isHome = false }: { isHome?: boolean }) => {
  const products = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div
      className={`${isHome ? "columns-2 sm:columns-3 lg:columns-5 gap-6 space-y-6 " : "columns-2 sm:columns-2 lg:columns-4 gap-6 space-y-6"}`}
    >
      {products.map((product, index) => (
        <div key={index} className="break-inside-avoid">
          <ProductCardSkeleton product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
