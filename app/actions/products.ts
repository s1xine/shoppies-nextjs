"use server";

import { cache } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

// export const getProducts = cache(async (): Promise<Product[]> => {
//   try {
//     const res = await fetch("https://fakestoreapi.com/products", {
//       next: { revalidate: 300 },
//     });

//     if (!res.ok) return [];
//     return res.json();
//   } catch {
//     return [];
//   }
// });

export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    console.log("Fetching products...");

    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 300 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      console.error("API failed");
      return [];
    }

    const data = await res.json();
    console.log("Products:", data.length);

    return data;
  } catch (err) {
    console.error("Fetch crashed:", err);
    return [];
  }
});
