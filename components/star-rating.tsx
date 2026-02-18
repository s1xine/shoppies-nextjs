"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRatingProps } from "@/types/product";

const StarRating = ({
  value,
  defaultValue = 0,
  onChange,
  size = 20,
  readonly = false,
}: StarRatingProps) => {
  const [internalRating, setInternalRating] = useState(defaultValue);

  const rating = value ?? internalRating;

  const handleClick = (star: number) => {
    if (readonly) return;

    setInternalRating(star);
    onChange?.(star);
  };

  return (
    <div className="flex items-center gap-1 ">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;

        return (
          <Star
            key={star}
            size={size}
            onClick={() => handleClick(star)}
            className={cn(
              "transition cursor-pointer",
              readonly && "cursor-default",
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground",
            )}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
