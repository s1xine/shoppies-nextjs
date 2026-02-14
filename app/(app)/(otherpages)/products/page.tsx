import PageHeader from "@/components/page-header";
import ProductsGrid from "@/components/products-grid";

export default async function ProductsPage() {
  return (
    <main>
      <PageHeader title="Products" />
      <ProductsGrid />
    </main>
  );
}
