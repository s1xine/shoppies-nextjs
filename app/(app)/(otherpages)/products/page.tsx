import PageHeader from "@/components/page-header";
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
import CategoryFilterWrapper from "@/components/products/caregory-filter-wrapper";
import CategoryFilterSkeleton from "@/components/products/category-filter-skeleton";
import ProductsByCategoryWrapper from "@/components/products/products-by-category-wrapper";

export default function ProductsPage() {
  return (
    <main className="pb-16">
      {/* Header */}
      <PageHeader
        title="Explore Products"
        subtitle="Gear, tools and lifestyle products for developers"
      />

      {/* SEARCH + SORT BAR */}

      <div className=" flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
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
            <h3 className="font-semibold mb-4 text-lg">Categories</h3>
            <Suspense fallback={<CategoryFilterSkeleton />}>
              <CategoryFilterWrapper />
            </Suspense>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="col-span-12 lg:col-span-9">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductsByCategoryWrapper />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
