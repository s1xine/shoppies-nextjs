"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { Navlink, navLinks } from "./navbar";
import { ThemeToggle } from "../ThemeToggle";

const MobileMenu = ({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`
        fixed inset-0 z-40 md:hidden transition-all duration-300
        ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)}
      />

      {/* menu panel */}
      <div
        className={`
          absolute top-24 left-1/2 -translate-x-1/2
          w-[92%] rounded-3xl
          bg-white/80 dark:bg-black/80
          backdrop-blur-xl
          border border-white/20 dark:border-white/10
          shadow-2xl
          p-6
          transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
          ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
        `}
      >
        <div className="flex flex-col gap-6 text-lg font-medium">
          {navLinks.map((link: Navlink) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t pt-4 flex flex-col gap-4">
            <ThemeToggle />

            <SignedOut>
              <SignInButton mode="modal">
                <button onClick={() => setMobileOpen(false)}>Login</button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="w-full rounded-full">Sign up</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)}>
                Wishlist
              </Link>

              <Link href="/cart" onClick={() => setMobileOpen(false)}>
                Cart
              </Link>

              {/* <UserButton showName={true} /> */}
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
