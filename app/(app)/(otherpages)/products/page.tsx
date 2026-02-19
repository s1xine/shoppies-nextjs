import PageHeader from "@/components/page-header";
import CategoryFilter from "@/components/products/category-filter";
import ProductsGrid from "@/components/products/products-grid";
import {
  getAllProducts,
  getCategories,
} from "@/lib/db/queries/products-queries";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/products/product-grid-skeleton";

export default async function ProductsPage() {
  const categories = await getCategories();
  const products = await getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 pb-16">
      {/* Header */}
      <PageHeader
        title="Explore Products"
        subtitle="Gear, tools and lifestyle products for developers"
      />

      {/* SEARCH + SORT BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        {/* search */}
        <div className="w-full md:w-96">
          <Input placeholder="Search products..." />
        </div>

        {/* right controls */}
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Sort: Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="new">Newest</SelectItem>
              <SelectItem value="low">Price: Low → High</SelectItem>
              <SelectItem value="high">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* LAYOUT */}
      <div className="grid grid-cols-12 gap-10">
        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-24">
            <CategoryFilter categories={categories} />
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="col-span-12 lg:col-span-9">
          {products.length === 0 ? (
            <div className="border rounded-xl p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm">
                Try selecting another category or search something else.
              </p>
            </div>
          ) : (
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductsGrid products={products} />
            </Suspense>
          )}
        </section>
      </div>
    </main>
  );
}
