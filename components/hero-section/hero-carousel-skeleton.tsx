"use client";

import { Skeleton } from "../ui/skeleton";

export default function HeroCarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 md:px-10">
        {/* LEFT TEXT */}
        <div className="space-y-7 order-2 lg:order-1">
          <Skeleton className="h-12 md:h-16 w-3/4 rounded-xl bg-white/10" />

          <Skeleton className="h-5 w-full max-w-md bg-white/10" />
          <Skeleton className="h-5 w-4/5 max-w-md bg-white/10" />

          <Skeleton className="h-6 w-32 bg-white/10" />

          <div className="flex gap-4 pt-6">
            <Skeleton className="h-14 w-36 rounded-full bg-white/10" />
            <Skeleton className="h-14 w-36 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="relative flex justify-center order-1 lg:order-2">
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent blur-3xl rounded-full" />

          <div className="relative w-full max-w-xl aspect-4/3">
            <Skeleton className="w-full h-full rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
