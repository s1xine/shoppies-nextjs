"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Pencil } from "lucide-react";
import { useCreateCategory, useUpdateCategory } from "../_lib/admin-queries";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

interface CategoryFormDialogProps {
  category?: Category;
  onSuccess?: () => void;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CategoryFormDialog({
  category,
  onSuccess,
}: CategoryFormDialogProps) {
  const isEdit = !!category;
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const [image, setImage] = useState(category?.image || "");

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setName(category?.name || "");
      setSlug(category?.slug || "");
      setImage(category?.image || "");
    }
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!isEdit) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      slug,
      image: image || undefined,
    };

    if (isEdit && category) {
      updateMutation.mutate(
        { id: category.id, data },
        {
          onSuccess: () => {
            setOpen(false);
            onSuccess?.();
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setOpen(false);
          onSuccess?.();
          setName("");
          setSlug("");
          setImage("");
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-(--admin-muted-foreground) hover:text-(--admin-primary)"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="admin-gradient text-white hover:opacity-90 gap-2">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-(--admin-card) border-(--admin-border)">
        <DialogHeader>
          <DialogTitle className="text-(--admin-fg)">
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription className="text-(--admin-muted-foreground)">
            {isEdit
              ? "Update the category details below"
              : "Fill in the details to create a new category"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-(--admin-fg)">
              Name *
            </label>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="Category name"
              className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-(--admin-fg)">
              Slug *
            </label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="category-slug"
              className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-(--admin-fg)">
              Image URL
            </label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/category.jpg"
              className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-(--admin-border) text-(--admin-fg)"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="admin-gradient text-white hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
