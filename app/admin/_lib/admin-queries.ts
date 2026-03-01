import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminProducts,
  getAdminCategories,
  getDashboardStats,
  getMonthlySalesData,
  getProductWiseSales,
  getRecentOrders,
  toggleProductActive,
  toggleProductStock,
  deleteCategory,
  createProduct,
  updateProduct,
  createCategory,
  updateCategory,
} from "@/actions/admin-actions";
import { toast } from "sonner";

// ─── Interfaces ───

export interface AdminProduct {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  rating: number | null;
  reviewCount: number | null;
  isBestSeller: boolean | null;
  isNew: boolean | null;
  isActive: boolean | null;
  inStock: boolean | null;
  categoryId: number | null;
  createdAt: Date | null;
  categoryName: string | null;
}

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  productCount: number;
}

export interface ProductInput {
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isActive?: boolean;
  inStock?: boolean;
}

export interface CategoryInput {
  name: string;
  slug: string;
  image?: string;
}

// ─── Queries ───

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => getDashboardStats(),
  });
}

export function useSalesData() {
  return useQuery({
    queryKey: ["admin", "sales"],
    queryFn: () => getMonthlySalesData(),
  });
}

export function useProductSales() {
  return useQuery({
    queryKey: ["admin", "product-sales"],
    queryFn: () => getProductWiseSales(),
  });
}

export function useRecentOrders() {
  return useQuery({
    queryKey: ["admin", "recent-orders"],
    queryFn: () => getRecentOrders(),
  });
}

export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => getAdminProducts(),
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => getAdminCategories(),
  });
}

// ─── Mutations ───

export function useToggleProductActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) =>
      toggleProductActive(id, active),
    onMutate: async ({ id, active }) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "products"] });
      const previousProducts = queryClient.getQueryData<AdminProduct[]>([
        "admin",
        "products",
      ]);
      if (previousProducts) {
        queryClient.setQueryData<AdminProduct[]>(["admin", "products"], (old) =>
          old?.map((p) => (p.id === id ? { ...p, isActive: active } : p)),
        );
      }
      return { previousProducts };
    },
    onError: (_err: Error | unknown, _variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData<AdminProduct[]>(
          ["admin", "products"],
          context.previousProducts,
        );
      }
      toast.error("Failed to update status");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useToggleProductStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, inStock }: { id: number; inStock: boolean }) =>
      toggleProductStock(id, inStock),
    onMutate: async ({ id, inStock }) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "products"] });
      const previousProducts = queryClient.getQueryData<AdminProduct[]>([
        "admin",
        "products",
      ]);
      if (previousProducts) {
        queryClient.setQueryData<AdminProduct[]>(["admin", "products"], (old) =>
          old?.map((p) => (p.id === id ? { ...p, inStock: inStock } : p)),
        );
      }
      return { previousProducts };
    },
    onError: (_err: Error | unknown, _variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData<AdminProduct[]>(
          ["admin", "products"],
          context.previousProducts,
        );
      }
      toast.error("Failed to update stock");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInput) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product created successfully");
    },
    onError: (err: Error | unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to create product";
      toast.error(msg);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProductInput> }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product updated successfully");
    },
    onError: (err: Error | unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to update product";
      toast.error(msg);
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInput) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category created successfully");
    },
    onError: (err: Error | unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to create category";
      toast.error(msg);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CategoryInput> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category updated successfully");
    },
    onError: (err: Error | unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to update category";
      toast.error(msg);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category deleted");
    },
    onError: (err: Error | unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to delete category";
      toast.error(msg);
    },
  });
}
