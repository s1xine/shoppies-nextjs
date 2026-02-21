import BreadCrumbComponent from "@/components/bread-crumb-component";
import ProductViewFetching from "@/components/products/product-view-fetching";
import ProductViewSkeleton from "@/components/products/product-view-skeleton";
import { Suspense } from "react";

const ProductViewPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      <BreadCrumbComponent productTitle={slug} />

      <div className="container mx-auto px-6 mt-10">
        <Suspense fallback={<ProductViewSkeleton />}>
          <ProductViewFetching slug={slug} />
        </Suspense>
      </div>
      {/* extra spacing bottom */}
      <div className="h-24" />
    </div>
  );
};

export default ProductViewPage;
