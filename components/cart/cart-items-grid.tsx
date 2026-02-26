import { CartItem } from "@/types/cart";
import CartItemCard from "./cart-item-card";

const CartItemsGrid = ({ cartItems }: { cartItems: CartItem[] }) => {
  return (
    <>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </>
  );
};

export default CartItemsGrid;
