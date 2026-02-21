import ProductViewModalShell from "@/components/products/product-view-modal-shell";

const ProductViewModal = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  return <ProductViewModalShell slug={slug} />;
};

export default ProductViewModal;
