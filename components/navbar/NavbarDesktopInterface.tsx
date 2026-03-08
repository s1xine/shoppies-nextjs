import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NavbarDesktopInterface = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="hidden md:flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[10px] px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>Cart</TooltipContent>
      </Tooltip>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm font-medium">Login</button>
        </SignInButton>

        <SignUpButton mode="modal">
          <Button className="rounded-full">Sign up</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/wishlist" className="relative">
              <Heart className="" size={20} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Wishlist</TooltipContent>
        </Tooltip>

        <UserButton />
      </SignedIn>
    </div>
  );
};

export default NavbarDesktopInterface;
