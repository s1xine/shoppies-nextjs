"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistCardSkeleton() {
  return (
    <Card className="flex flex-col h-full rounded-2xl border bg-card/60 backdrop-blur-xl overflow-hidden">
      <CardContent className="p-6 flex-1 flex flex-col">
        <Skeleton className="h-40 w-full mb-4 rounded-lg" />

        <div className="mt-auto space-y-2">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />

          <Skeleton className="h-4 w-1/3 rounded-md mt-2" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 px-6 pt-2">
        <Skeleton className="flex-1 h-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardFooter>
    </Card>
  );
}
