"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ProductPageSkeleton = ({ isModal = false }: { isModal?: boolean }) => {
  return (
    <div
      className="
        grid
        md:grid-cols-1
        xl:grid-cols-[1.2fr_.8fr]
        2xl:grid-cols-[1.4fr_.6fr]
        animate-pulse
      "
    >
      {/* ================= LEFT: IMAGE SECTION ================= */}
      <div className="bg-muted/40 p-6 sm:p-10 flex flex-col justify-center">
        {/* main image */}
        <div className="relative aspect-square w-full max-w-2xl mx-auto">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>

        {/* thumbnails */}
        <div className="flex gap-3 mt-8 flex-wrap justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-xl" />
          ))}
        </div>
      </div>

      {/* ================= RIGHT: DETAILS ================= */}
      <div className="p-6 sm:p-10 flex flex-col">
        {/* title */}
        <Skeleton className="h-8 w-3/4 rounded-md" />

        {/* price */}
        <Skeleton className="h-10 w-40 mt-6 rounded-md" />

        {/* rating */}
        <div className="flex items-center gap-2 mt-6">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* buttons */}
        {!isModal && (
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Skeleton className="h-12 flex-1 rounded-lg" />
            <Skeleton className="h-12 flex-1 rounded-lg" />
          </div>
        )}

        {/* description */}
        <div className="mt-10 space-y-3 max-w-md">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>

        {isModal && <div className="flex-1" />}
        {isModal && (
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Skeleton className="h-12 flex-1 rounded-lg" />
            <Skeleton className="h-12 flex-1 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
