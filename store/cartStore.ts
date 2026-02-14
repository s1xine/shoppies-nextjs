import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  wishlist: number[];
  products: Product[];

  setProducts: (products: Product[]) => void;

  addToCart: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  removeItem: (id: number) => void;

  toggleWishlist: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlist: [],
      products: [],

      // hydrate products
      setProducts: (products) => set({ products }),

      // add first time OR increment
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

          return {
            cartItems: [...state.cartItems, { id, quantity: 1 }],
          };
        }),

      // explicit increment
      incrementQty: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      // 🔥 decrement qty
      decrementQty: (id) =>
        set((state) => {
          const item = state.cartItems.find((i) => i.id === id);
          if (!item) return state;

          // if qty = 1 → remove item
          if (item.quantity === 1) {
            return {
              cartItems: state.cartItems.filter((i) => i.id !== id),
            };
          }

          // else decrease
          return {
            cartItems: state.cartItems.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            ),
          };
        }),

      // remove fully
      removeItem: (id) =>
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
        products: state.products,
      }),
    },
  ),
);
