"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryFormDialog } from "./category-form-dialog";
import {
  Search,
  FolderTree,
  Package,
  Trash2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAdminCategories,
  useDeleteCategory,
  AdminCategory,
} from "../_lib/admin-queries";
import { AdminCategoriesSkeleton } from "./admin-skeletons";

export function CategoriesClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: initialCategories = [], isLoading } = useAdminCategories();
  const deleteCategoryMutation = useDeleteCategory();

  if (isLoading) {
    return <AdminCategoriesSkeleton />;
  }

  const filteredCategories = (initialCategories as AdminCategory[]).filter(
    (c) => {
      if (search) {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
        );
      }
      return true;
    },
  );

  const handleDelete = async (id: number) => {
    deleteCategoryMutation.mutate(id);
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const totalProducts = (initialCategories as AdminCategory[]).reduce(
    (sum, c) => sum + c.productCount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--admin-muted-foreground)" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-(--admin-card) border-(--admin-border) text-(--admin-fg)"
          />
        </div>
        <CategoryFormDialog onSuccess={handleSuccess} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-(--admin-card) border border-(--admin-border)">
          <p className="text-xs text-(--admin-muted-foreground) mb-1">
            Total Categories
          </p>
          <p className="text-2xl font-bold text-(--admin-fg)">
            {initialCategories.length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-(--admin-card) border border-(--admin-border)">
          <p className="text-xs text-(--admin-muted-foreground) mb-1">
            Total Products
          </p>
          <p className="text-2xl font-bold text-(--admin-fg)">
            {totalProducts}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-(--admin-card) border border-(--admin-border) sm:col-span-1 col-span-2">
          <p className="text-xs text-(--admin-muted-foreground) mb-1">
            Avg Products / Category
          </p>
          <p className="text-2xl font-bold text-(--admin-fg)">
            {initialCategories.length > 0
              ? (totalProducts / initialCategories.length).toFixed(1)
              : "0"}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <Card className="border-(--admin-border) bg-(--admin-card)">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderTree className="w-12 h-12 text-(--admin-muted-foreground) mb-4" />
            <p className="text-(--admin-muted-foreground) text-lg font-medium">
              No categories found
            </p>
            <p className="text-(--admin-muted-foreground) text-sm mt-1">
              {search
                ? "Try adjusting your search"
                : "Add your first category to get started"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="border-(--admin-border) bg-(--admin-card) overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-(--admin-primary)/30 group"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative h-32 bg-(--admin-muted) flex items-center justify-center overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 text-(--admin-muted-foreground)" />
                      <span className="text-xs text-(--admin-muted-foreground)">
                        No image
                      </span>
                    </div>
                  )}

                  {/* Action buttons overlay */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <CategoryFormDialog
                      category={category}
                      onSuccess={handleSuccess}
                    />
                    <DeleteCategoryDialog
                      category={category}
                      onDelete={handleDelete}
                      isPending={
                        deleteCategoryMutation.isPending &&
                        deleteCategoryMutation.variables === category.id
                      }
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-(--admin-fg) truncate">
                    {category.name}
                  </h3>
                  <p className="text-xs text-(--admin-muted-foreground) mt-0.5 truncate">
                    /{category.slug}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-sm text-(--admin-muted-foreground)">
                    <Package className="w-4 h-4" />
                    <span>
                      {category.productCount}{" "}
                      {category.productCount === 1 ? "product" : "products"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Confirmation dialog for deleting a category
function DeleteCategoryDialog({
  category,
  onDelete,
  isPending,
}: {
  category: AdminCategory;
  onDelete: (id: number) => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-(--admin-muted-foreground) hover:text-red-500 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm bg-(--admin-card) border-(--admin-border)">
        <DialogHeader>
          <DialogTitle className="text-(--admin-fg)">
            Delete Category
          </DialogTitle>
          <DialogDescription className="text-(--admin-muted-foreground)">
            Are you sure you want to delete &quot;{category.name}&quot;?
            {category.productCount > 0 && (
              <span className="block mt-2 text-amber-500">
                ⚠️ This category has {category.productCount} associated{" "}
                {category.productCount === 1 ? "product" : "products"}. You must
                reassign or delete them first.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-(--admin-border) text-(--admin-fg)"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(category.id);
              if (!category.productCount) setOpen(false);
            }}
            disabled={isPending || category.productCount > 0}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
