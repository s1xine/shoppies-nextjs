import { Suspense } from "react";
import ProductViewFetching from "./product-view-fetching";
import ProductViewSkeleton from "./product-view-skeleton";
import ProductViewModalClient from "./product-modal";

const ProductViewModalShell = ({ slug }: { slug: string }) => {
  return (
    <ProductViewModalClient>
      <Suspense fallback={<ProductViewSkeleton isModal />}>
        <ProductViewFetching slug={slug} isModal />
      </Suspense>
    </ProductViewModalClient>
  );
};

export default ProductViewModalShell;
