"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AdminThemeToggleProps {
  isCollapsed?: boolean;
}

export function AdminThemeToggle({ isCollapsed }: AdminThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex gap-1 bg-(--admin-muted) rounded-lg p-1",
          isCollapsed ? "flex-col" : "flex-row",
        )}
      >
        <div className="w-8 h-8 rounded-md" />
        <div className="w-8 h-8 rounded-md" />
        <div className="w-8 h-8 rounded-md" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-1 bg-(--admin-muted) rounded-lg p-1",
        isCollapsed ? "flex-col" : "flex-row",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={cn(
          "w-8 h-8 rounded-md transition-all",
          theme === "light"
            ? "bg-(--admin-card) text-(--admin-primary) shadow-sm"
            : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
        )}
      >
        <Sun className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={cn(
          "w-8 h-8 rounded-md transition-all",
          theme === "dark"
            ? "bg-(--admin-card) text-(--admin-primary) shadow-sm"
            : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
        )}
      >
        <Moon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("system")}
        className={cn(
          "w-8 h-8 rounded-md transition-all",
          theme === "system"
            ? "bg-(--admin-card) text-(--admin-primary) shadow-sm"
            : "text-(--admin-muted-foreground) hover:text-(--admin-fg)",
        )}
      >
        <Monitor className="w-4 h-4" />
      </Button>
    </div>
  );
}
