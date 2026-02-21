"use client";

import Link from "next/link";
import { X, Menu, SearchIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Suspense, useEffect, useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import Image from "next/image";
import NavbarDesktopInterface from "./NavbarDesktopInterface";
import MobileMenu from "./MobileMenu";
import NavbarDesktopCenter from "./NavbarDesktopCenter";
import NavbarDesktopInterfaceSkeleton from "./NavbarDesktopInterfaceSkeleton";

export interface Navlink {
  href: string;
  label: string;
}

export const navLinks: Navlink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              ? "mt-4 w-[92%] max-w-7xl px-6 h-18 rounded-full backdrop-blur-lg bg-white/70 dark:bg-black/50 border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] "
              : "w-full px-10 h-16 bg-white dark:bg-black border-b transition-all duration-100 ease-linear"
          }
        `}
          >
            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* LOGO */}
            <Link
              href="/"
              className={`${!scrolled && "md:mx-auto"} flex items-center shrink-0`}
            >
              <Image
                src="/Shoppies_logo.png"
                alt="shoppies-logo"
                width={100}
                height={100}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP CENTER */}
            <NavbarDesktopCenter scrolled={scrolled} />

            {/* RIGHT */}
            <div
              className={`${!scrolled && "md:mx-auto"} flex items-center gap-4`}
            >
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <div className=" md:hidden">
                <SearchIcon className="w-7 h-7" />
              </div>

              <div className="md:hidden ">
                <UserButton
                  showName={false}
                  appearance={{ elements: { avatarBox: "w-9 h-9 mt-2 " } }}
                />
              </div>

              {/* whishlist, cart and auth actions for desktop */}
              <Suspense fallback={<NavbarDesktopInterfaceSkeleton />}>
                <NavbarDesktopInterface />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </>
  );
}
