import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  cartItems: CartItem[];
  isHydratedFromDB: boolean;
  setCart: (items: CartItem[], isHydrated?: boolean) => void;
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  getCartCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isHydratedFromDB: false,

      setCart: (items, isHydrated) =>
        set((state) => ({
          cartItems: items,
          isHydratedFromDB:
            isHydrated !== undefined ? isHydrated : state.isHydratedFromDB,
        })),

      clearCart: () => set({ cartItems: [], isHydratedFromDB: false }),

      addToCart: (item) =>
        set((state) => {
          const exists = state.cartItems.find((i) => i.id === item.id);

          if (exists) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { cartItems: [...state.cartItems, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, qty) =>
        set((state) => {
          if (qty <= 0) {
            return {
              cartItems: state.cartItems.filter((i) => i.id !== id),
            };
          }

          return {
            cartItems: state.cartItems.map((i) =>
              i.id === id ? { ...i, quantity: qty } : i,
            ),
          };
        }),

      getCartCount: () => get().cartItems.reduce((t, i) => t + i.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        isHydratedFromDB: state.isHydratedFromDB,
      }),
    },
  ),
);
