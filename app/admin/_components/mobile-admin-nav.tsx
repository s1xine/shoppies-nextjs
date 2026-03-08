"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  User,
  LogOut,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { logoutAdmin } from "@/app/admin/_lib/admin-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
];

export function MobileAdminNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin/login";
  };

  return (
    <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-(--admin-sidebar-bg) border border-(--admin-sidebar-border) rounded-2xl shadow-xl px-2 py-1 flex items-center justify-around backdrop-blur-lg">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all duration-200 flex-1",
                isActive
                  ? "text-(--admin-primary)"
                  : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-colors",
                  isActive ? "bg-(--admin-sidebar-accent)" : "bg-transparent",
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all duration-200 flex-1 text-(--admin-muted-foreground) hover:text-(--admin-fg)">
              <div className="p-1 rounded-lg bg-transparent">
                <User className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-tight">
                Account
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-(--admin-card) border-(--admin-border) rounded-xl mb-2"
          >
            <DropdownMenuLabel className="text-(--admin-muted-foreground) px-4 py-1 text-[10px] uppercase">
              Appearance
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className={cn(
                "px-4 py-2 cursor-pointer flex items-center justify-between",
                theme === "light" && "text-(--admin-primary)",
              )}
            >
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </div>
              {theme === "light" && (
                <div className="w-1.5 h-1.5 rounded-full bg-(--admin-primary)" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={cn(
                "px-4 py-2 cursor-pointer flex items-center justify-between",
                theme === "dark" && "text-(--admin-primary)",
              )}
            >
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </div>
              {theme === "dark" && (
                <div className="w-1.5 h-1.5 rounded-full bg-(--admin-primary)" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className={cn(
                "px-4 py-2 cursor-pointer flex items-center justify-between",
                theme === "system" && "text-(--admin-primary)",
              )}
            >
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>System</span>
              </div>
              {theme === "system" && (
                <div className="w-1.5 h-1.5 rounded-full bg-(--admin-primary)" />
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-(--admin-border)" />
            <DropdownMenuLabel className="text-(--admin-muted-foreground) px-4 py-1 text-[10px] uppercase">
              Account
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-600 focus:bg-red-500/10 px-4 py-2 cursor-pointer flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
