import ProductViewModalClient from "@/components/product-modal";
import { getProductBySlug } from "@/lib/db/queries/products-queries";

const ProductViewModal = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const productBySlug = await getProductBySlug(slug);
  return <ProductViewModalClient product={productBySlug} />;
};

export default ProductViewModal;
