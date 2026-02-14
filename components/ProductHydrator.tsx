"use client";

import { useEffect } from "react";
import { useCartStore, Product } from "@/store/cartStore";

export default function ProductHydrator({ products }: { products: Product[] }) {
  const storeProducts = useCartStore((state) => state.products);
  const setProducts = useCartStore((state) => state.setProducts);

  useEffect(() => {
    // hydrate only if empty
    if (!storeProducts || storeProducts.length === 0) {
      setProducts(products);
    }
  }, [products, storeProducts, setProducts]);

  return null;
}
