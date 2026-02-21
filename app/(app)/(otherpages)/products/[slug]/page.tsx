import BreadCrumbComponent from "@/components/bread-crumb-component";
import ProductView from "@/components/products/product-view";
import { getProductBySlug } from "@/lib/db/queries/products-queries";
import { Product } from "@/types/product";

const ProductViewPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const product: Product = await getProductBySlug(slug);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <BreadCrumbComponent productTitle={product.title} />

      <div className="container mx-auto px-6 mt-12">
        <ProductView product={product} />
      </div>
      {/* extra spacing bottom */}
      <div className="h-24" />
    </div>
  );
};

export default ProductViewPage;
