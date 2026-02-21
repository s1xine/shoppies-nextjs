"use client";
import Link from "next/link";
import { navLinks } from "./navbar";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavbarDesktopCenter = ({ scrolled }: { scrolled: boolean }) => {
  const pathname = usePathname();

  const [openSearch, setOpenSearch] = useState(false);

  return (
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
  );
};

export default NavbarDesktopCenter;
