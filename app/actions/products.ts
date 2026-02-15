"use server";

import { cache } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

//Production ready version
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
});
