"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/app/admin/_lib/admin-auth";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
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

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin/login";
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex h-[calc(100vh-2rem)] sticky top-4 flex-col border border-[var(--admin-sidebar-border)] bg-[var(--admin-sidebar-bg)] transition-all duration-300 ease-in-out z-40 shrink-0 overflow-x-hidden rounded-2xl shadow-sm",
        collapsed ? "w-[68px]" : "w-[250px]",
      )}
      style={{ minWidth: collapsed ? "68px" : "250px" }}
    >
      {/* Logo / Brand */}
      <div
        className={cn(
          "flex items-center h-16 px-4 gap-3",
          collapsed && "justify-center",
        )}
      >
        <Image
          src="/shoppies-icon.png"
          alt="shoppies-logo"
          width={100}
          height={100}
          priority
          className="h-8 w-auto object-contain"
        />
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-[var(--admin-sidebar-fg)] text-lg leading-tight truncate">
              Shoppies
            </h1>
            <p className="text-xs text-[var(--admin-muted-foreground)] truncate">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      <Separator className="bg-[var(--admin-sidebar-border)]" />

      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size={collapsed ? "icon" : "default"}
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "text-[var(--admin-muted-foreground)] hover:text-[var(--admin-fg)] hover:bg-[var(--admin-muted)]",
          collapsed ? "w-full" : "w-full justify-start gap-3 px-3",
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <>
            <ChevronLeft className="w-5 h-5 shrink-0" />
            <span>Collapse</span>
          </>
        )}
      </Button>

      <Separator className="bg-[var(--admin-sidebar-border)]" />

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          const linkContent = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[var(--admin-sidebar-accent)] text-[var(--admin-sidebar-accent-fg)] shadow-sm"
                  : "text-[var(--admin-muted-foreground)] hover:text-[var(--admin-sidebar-fg)] hover:bg-[var(--admin-sidebar-accent)]",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive && "text-[var(--admin-primary)]",
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      <Separator className="bg-[var(--admin-sidebar-border)]" />

      {/* Bottom section */}
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-auto p-2 flex items-center gap-3 rounded-xl border border-transparent hover:border-(--admin-border) hover:bg-(--admin-muted) transition-all duration-200",
                collapsed ? "justify-center" : "justify-start",
              )}
            >
              <div className="w-9 h-9 rounded-full admin-gradient flex items-center justify-center shrink-0 shadow-sm border border-white/20">
                <User className="w-5 h-5 text-white" />
              </div>
              {!collapsed && (
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-semibold truncate w-full text-left">
                    Admin User
                  </span>
                  <span className="text-[10px] text-(--admin-muted-foreground) uppercase font-bold tracking-wider">
                    Access Root
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={collapsed ? "right" : "top"}
            align={collapsed ? "center" : "end"}
            className="w-56 bg-(--admin-card) border-(--admin-border) rounded-2xl p-2 shadow-2xl mb-2"
          >
            <DropdownMenuLabel className="text-(--admin-muted-foreground) px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest">
              Appearance
            </DropdownMenuLabel>
            <div className="grid grid-cols-3 gap-1 p-1 bg-(--admin-muted) rounded-xl mb-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg transition-all",
                  theme === "light"
                    ? "bg-(--admin-card) text-(--admin-primary) shadow-sm"
                    : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
                )}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg transition-all",
                  theme === "dark"
                    ? "bg-(--admin-card) text-(--admin-primary) shadow-sm"
                    : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
                )}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg transition-all",
                  theme === "system"
                    ? "bg-(--admin-card) text-(--admin-primary) shadow-sm"
                    : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
                )}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <DropdownMenuSeparator className="bg-(--admin-border) my-2" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-600 focus:bg-red-500/10 px-3 py-2.5 rounded-xl cursor-pointer flex items-center gap-3 font-medium"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span>Logout Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
