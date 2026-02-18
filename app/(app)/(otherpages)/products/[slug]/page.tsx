const ProductViewPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return <div>Product {slug} Page</div>;
};

export default ProductViewPage;
