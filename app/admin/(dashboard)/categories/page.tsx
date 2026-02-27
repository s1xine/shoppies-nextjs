import { AdminHeader } from "../../_components/admin-header";
import { CategoriesClient } from "../../_components/categories-client";

export default function AdminCategoriesPage() {
  return (
    <>
      <AdminHeader
        title="Categories"
        description="Organize your store's product categories"
      />
      <CategoriesClient />
    </>
  );
}
