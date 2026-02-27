"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductFormDialog } from "./product-form-dialog";
import {
  Search,
  Package,
  CheckCircle,
  XCircle,
  PackageCheck,
  PackageX,
  Image as ImageIcon,
  Star,
  Loader2,
  FolderTree,
} from "lucide-react";
import currencyIndianRupee from "@/utils/currency";
import { cn } from "@/lib/utils";
import {
  useAdminProducts,
  useAdminCategories,
  useToggleProductActive,
  useToggleProductStock,
  AdminProduct,
} from "../_lib/admin-queries";
import { AdminProductsSkeleton } from "./admin-skeletons";

export function ProductsClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "inactive" | "inStock" | "outOfStock"
  >("all");

  const { data: initialProducts = [], isLoading: productsLoading } =
    useAdminProducts();
  const { data: categories = [], isLoading: categoriesLoading } =
    useAdminCategories();

  const toggleActiveMutation = useToggleProductActive();
  const toggleStockMutation = useToggleProductStock();

  if (productsLoading || categoriesLoading) {
    return <AdminProductsSkeleton />;
  }

  const filteredProducts = (initialProducts as AdminProduct[])
    .filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .filter((p) => {
      switch (filter) {
        case "active":
          return p.isActive;
        case "inactive":
          return !p.isActive;
        case "inStock":
          return p.inStock;
        case "outOfStock":
          return !p.inStock;
        default:
          return true;
      }
    });

  const handleToggleActive = (id: number, current: boolean | null) => {
    toggleActiveMutation.mutate({ id, active: !current });
  };

  const handleToggleStock = (id: number, current: boolean | null) => {
    toggleStockMutation.mutate({ id, inStock: !current });
  };

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--admin-muted-foreground)" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-(--admin-card) border-(--admin-border) text-(--admin-fg) rounded-xl"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(
              [
                { key: "all", label: "All" },
                { key: "active", label: "Active" },
                { key: "inactive", label: "Inactive" },
                { key: "inStock", label: "In Stock" },
                { key: "outOfStock", label: "Out of Stock" },
              ] as const
            ).map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-xl text-xs font-semibold px-4 transition-all duration-200",
                  filter === key
                    ? "admin-gradient text-white border-0 shadow-md"
                    : "border-(--admin-border) text-(--admin-muted-foreground) hover:text-(--admin-fg) hover:bg-(--admin-muted)",
                )}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <ProductFormDialog categories={categories} onSuccess={handleSuccess} />
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="border-(--admin-border) bg-(--admin-card) rounded-3xl overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-(--admin-muted) flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-(--admin-muted-foreground)" />
            </div>
            <p className="text-(--admin-fg) text-xl font-bold">
              No products found
            </p>
            <p className="text-(--admin-muted-foreground) text-sm mt-2 max-w-62.5 text-center">
              {search || filter !== "all"
                ? "We couldn't find any products matching your current filters."
                : "Your inventory is empty. Start by adding your first masterpiece."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={cn(
                "group border-(--admin-border) bg-(--admin-card) overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-(--admin-primary)/5 hover:-translate-y-1 rounded-3xl",
                !product.isActive && "opacity-75 grayscale-[0.2]",
              )}
            >
              <CardContent className="p-0">
                {/* Image Section */}
                <div className="relative aspect-4/3 bg-(--admin-muted) flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-(--admin-muted-foreground)" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Badges overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isBestSeller && (
                      <span className="text-[10px] uppercase tracking-widest font-bold bg-amber-500 text-white px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                        <Star className="w-3 h-3 fill-white" />
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="text-[10px] uppercase tracking-widest font-bold admin-gradient text-white px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5">
                        New Arrival
                      </span>
                    )}
                  </div>

                  {/* Quick Edit */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
                    <ProductFormDialog
                      categories={categories}
                      product={product}
                      onSuccess={handleSuccess}
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-(--admin-fg) text-lg leading-tight group-hover:text-(--admin-primary) transition-colors truncate">
                        {product.title}
                      </h3>
                      <span className="text-xl font-black text-(--admin-fg) shrink-0">
                        {currencyIndianRupee(product.price)}
                      </span>
                    </div>
                    <p className="text-sm text-(--admin-muted-foreground) font-medium flex items-center gap-1.5 uppercase tracking-wide">
                      <FolderTree className="w-3.5 h-3.5" />
                      {product.categoryName || "Uncategorized"}
                    </p>
                  </div>

                  {/* Rating / Meta */}
                  {product.rating !== null && product.rating > 0 && (
                    <div className="flex items-center gap-3 pb-2">
                      <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-md text-sm font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        {product.rating}
                      </div>
                      <span className="text-xs text-(--admin-muted-foreground) font-medium">
                        Based on {product.reviewCount || 0} reviews
                      </span>
                    </div>
                  )}

                  {/* Action Toggles */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-(--admin-border)">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleToggleActive(product.id, product.isActive)
                      }
                      disabled={toggleActiveMutation.isPending}
                      className={cn(
                        "h-10 rounded-xl gap-2 text-xs font-bold uppercase tracking-wider transition-all",
                        product.isActive
                          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                          : "bg-red-500/10 text-red-500 hover:bg-red-500/20",
                      )}
                    >
                      {toggleActiveMutation.isPending &&
                      toggleActiveMutation.variables?.id === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : product.isActive ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {product.isActive ? "Active" : "Inactive"}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleToggleStock(product.id, product.inStock)
                      }
                      disabled={toggleStockMutation.isPending}
                      className={cn(
                        "h-10 rounded-xl gap-2 text-xs font-bold uppercase tracking-wider transition-all",
                        product.inStock
                          ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                          : "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
                      )}
                    >
                      {toggleStockMutation.isPending &&
                      toggleStockMutation.variables?.id === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : product.inStock ? (
                        <PackageCheck className="w-4 h-4" />
                      ) : (
                        <PackageX className="w-4 h-4" />
                      )}
                      {product.inStock ? "In Stock" : "Limited"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary bar */}
      <div className="flex items-center justify-between text-sm text-(--admin-muted-foreground) border-t border-(--admin-border) pt-4">
        <span>
          Showing {filteredProducts.length} of {initialProducts.length} products
        </span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            {
              (initialProducts as AdminProduct[]).filter((p) => p.isActive)
                .length
            }{" "}
            active
          </span>
          <span className="flex items-center gap-1">
            <PackageCheck className="w-3.5 h-3.5 text-blue-500" />
            {
              (initialProducts as AdminProduct[]).filter((p) => p.inStock)
                .length
            }{" "}
            in stock
          </span>
        </div>
      </div>
    </div>
  );
}
