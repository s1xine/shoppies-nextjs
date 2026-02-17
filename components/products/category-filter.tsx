"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types/product";

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-lg">Categories</h3>
      <ScrollArea className="h-100 pr-3">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="justify-start rounded-lg"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
