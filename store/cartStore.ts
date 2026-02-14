import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  wishlist: number[];
  products: Product[];

  setProducts: (products: Product[]) => void;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleWishlist: (id: number) => void;

  getProduct: (id: number) => Product | undefined;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlist: [],
      products: [],

      // hydrate products from server
      setProducts: (products) => set({ products }),

      addToCart: (id) =>
        set((state) => {
          const exists = state.cartItems.find((item) => item.id === id);
          if (exists) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return { cartItems: [...state.cartItems, { id, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((i) => i !== id)
            : [...state.wishlist, id],
        })),

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlist: state.wishlist,
        products: state.products, // persist products too
      }),
    },
  ),
);
