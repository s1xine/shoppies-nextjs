"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <p className="block md:hidden" onClick={toggleTheme}>
            {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
          </p>
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="relative rounded-full border-gray-100 dark:border-gray-500"
            >
              <Sun
                className="
            h-[1.2rem] w-[1.2rem]
            transition-all duration-300
            rotate-0 scale-100
            dark:-rotate-90 dark:scale-0
          "
              />

              <Moon
                className="
            absolute
            h-[1.2rem] w-[1.2rem]
            transition-all duration-300
            rotate-90 scale-0
            dark:rotate-0 dark:scale-100
          "
              />
            </Button>
          </div>
        </div>
      </TooltipTrigger>

      <TooltipContent>
        {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
      </TooltipContent>
    </Tooltip>
  );
}
