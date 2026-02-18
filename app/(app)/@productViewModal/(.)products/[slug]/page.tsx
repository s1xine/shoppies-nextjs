import ProductViewModalClient from "@/components/products/product-modal";
import { getProductBySlug } from "@/lib/db/queries/products-queries";
import { Product } from "@/types/product";

const ProductViewModal = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const productBySlug: Product = await getProductBySlug(slug);
  return <ProductViewModalClient product={productBySlug} />;
};

export default ProductViewModal;
