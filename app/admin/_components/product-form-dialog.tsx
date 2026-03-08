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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Pencil } from "lucide-react";
import { useCreateProduct, useUpdateProduct } from "../_lib/admin-queries";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  categoryId: number | null;
  isBestSeller: boolean | null;
  isNew: boolean | null;
  isActive: boolean | null;
  inStock: boolean | null;
}

interface ProductFormDialogProps {
  categories: Category[];
  product?: Product;
  onSuccess?: () => void;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductFormDialog({
  categories,
  product,
  onSuccess,
}: ProductFormDialogProps) {
  const isEdit = !!product;
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(product?.title || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [images, setImages] = useState(product?.images?.join(", ") || "");
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ? String(product.categoryId) : "",
  );
  const [isBestSeller, setIsBestSeller] = useState(
    product?.isBestSeller ?? false,
  );
  const [isNew, setIsNew] = useState(product?.isNew ?? true);
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [inStock, setInStock] = useState(product?.inStock ?? true);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      // Sync state when opening
      setTitle(product?.title || "");
      setSlug(product?.slug || "");
      setDescription(product?.description || "");
      setPrice(product ? String(product.price) : "");
      setImages(product?.images?.join(", ") || "");
      setCategoryId(product?.categoryId ? String(product.categoryId) : "");
      setIsBestSeller(product?.isBestSeller ?? false);
      setIsNew(product?.isNew ?? true);
      setIsActive(product?.isActive ?? true);
      setInStock(product?.inStock ?? true);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isEdit) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageArray = images
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean);

    const data = {
      title,
      slug,
      description,
      price: parseInt(price),
      images: imageArray,
      categoryId: parseInt(categoryId),
      isBestSeller,
      isNew,
      isActive,
      inStock,
    };

    if (isEdit && product) {
      updateMutation.mutate(
        { id: product.id, data },
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
          setTitle("");
          setSlug("");
          setDescription("");
          setPrice("");
          setImages("");
          setCategoryId("");
          setIsBestSeller(false);
          setIsNew(true);
          setIsActive(true);
          setInStock(true);
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
            Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-(--admin-card) border-(--admin-border)">
        <DialogHeader>
          <DialogTitle className="text-(--admin-fg)">
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription className="text-(--admin-muted-foreground)">
            {isEdit
              ? "Update the product details below"
              : "Fill in the details to create a new product"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-(--admin-fg)">
              Title *
            </label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="Product title"
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
              placeholder="product-slug"
              className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-(--admin-fg)">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
              rows={3}
              className="w-full rounded-md bg-(--admin-muted) border border-(--admin-border) text-(--admin-fg) px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-ring) resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--admin-fg)">
                Price (cents) *
              </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="9999"
                className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-(--admin-fg)">
                Category *
              </label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-(--admin-card) border-(--admin-border)">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-(--admin-fg)">
              Images (comma-separated URLs) *
            </label>
            <Input
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              className="bg-(--admin-muted) border-(--admin-border) text-(--admin-fg)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ToggleItem
              label="Active"
              checked={!!isActive}
              onChange={setIsActive}
            />
            <ToggleItem
              label="In Stock"
              checked={!!inStock}
              onChange={setInStock}
            />
            <ToggleItem
              label="Best Seller"
              checked={!!isBestSeller}
              onChange={setIsBestSeller}
            />
            <ToggleItem label="New" checked={!!isNew} onChange={setIsNew} />
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
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ToggleItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 p-3 rounded-lg bg-(--admin-muted) border border-(--admin-border) cursor-pointer hover:bg-(--admin-muted)/80 transition-colors">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--admin-ring)",
          checked ? "bg-(--admin-primary)" : "bg-(--admin-border)",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </button>
      <span className="text-sm text-(--admin-fg)">{label}</span>
    </label>
  );
}
