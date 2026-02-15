"use server";

import { cache } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
});
