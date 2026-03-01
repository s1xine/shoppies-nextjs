import { AdminHeader } from "../../_components/admin-header";
import { ProductsClient } from "../../_components/products-client";

export default function AdminProductsPage() {
  return (
    <>
      <AdminHeader
        title="Products"
        description="Manage and monitor your product inventory"
      />
      <ProductsClient />
    </>
  );
}
