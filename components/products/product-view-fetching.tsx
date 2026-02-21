import ProductView from "@/components/products/product-view";
import { getProductBySlug } from "@/lib/db/queries/products-queries";
import { Product } from "@/types/product";

const ProductViewFetching = async ({
  slug,
  isModal = false,
}: {
  slug: string;
  isModal?: boolean;
}) => {
  const product: Product = await getProductBySlug(slug);

  if (!product) return <div>Product not found</div>;

  return <ProductView product={product} isModal={isModal} />;
};

export default ProductViewFetching;
