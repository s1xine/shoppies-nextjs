"use server";

import { cache } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const getProducts = cache(async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
});
