"use client";

import Link from "next/link";
import { Search, ShoppingCart, X, Menu } from "lucide-react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className=" flex justify-center transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ">
          <div
            className={`
            flex items-center justify-between will-change-transform 
          ${
            scrolled
              ? "mt-4 w-[92%] max-w-7xl px-6 h-14 rounded-full backdrop-blur-xl bg-white/70 dark:bg-black/50 border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] "
              : "w-full px-10 h-16 bg-white dark:bg-black border-b transition-all duration-100 ease-linear"
          }
        `}
          >
            {/* LOGO */}
            <Link
              href="/"
              className={`${!scrolled && "md:mx-auto"} font-bold text-lg`}
            >
              <Image
                src="/Shoppies_logo.png"
                alt="site-logo"
                width={200}
                height={50}
              />
            </Link>

            {/* DESKTOP CENTER */}
            <div
              className={`${!scrolled && "md:mx-auto"} hidden md:flex items-center gap-8`}
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-sm font-medium"
                  >
                    {link.label}
                    <span
                      className={`
                      absolute -bottom-1 left-0 h-0.5 w-full bg-black dark:bg-white
                      transition-all duration-300
                      ${active ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                    `}
                    />
                  </Link>
                );
              })}

              {/* SEARCH */}
              <div className="flex items-center relative">
                <Search
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setOpenSearch(!openSearch)}
                />

                <input
                  placeholder="Search..."
                  className={`
                  transition-all duration-300
                  bg-transparent border-b border-black/20 dark:border-white/20
                  focus:outline-none text-sm ml-2
                  ${
                    openSearch
                      ? "w-56 opacity-100 px-2"
                      : "w-0 opacity-0 px-0 border-none"
                  }
                `}
                />

                {openSearch && (
                  <X
                    size={16}
                    onClick={() => setOpenSearch(false)}
                    className="cursor-pointer opacity-70"
                  />
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div
              className={`${!scrolled && "md:mx-auto"} flex items-center gap-4`}
            >
              <ThemeToggle />

              {/* Desktop auth/cart */}
              <div className="hidden md:flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium">Login</button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button className="rounded-full">Sign up</Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link href="/cart" className="relative">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-[10px] px-1.5 py-0.5 rounded-full">
                      2
                    </span>
                  </Link>

                  <UserButton />
                </SignedIn>
              </div>

              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden"
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t pt-4 flex flex-col gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button onClick={() => setMobileOpen(false)}>Login</button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button className="w-full rounded-full">Sign up</Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href="/cart" onClick={() => setMobileOpen(false)}>
                  Cart
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
