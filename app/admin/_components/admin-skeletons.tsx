"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Stats Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-(--admin-border) bg-(--admin-card)">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24 bg-(--admin-muted)" />
              <Skeleton className="h-8 w-8 rounded-lg bg-(--admin-muted)" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2 bg-(--admin-muted)" />
              <Skeleton className="h-4 w-32 bg-(--admin-muted)" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-(--admin-border) bg-(--admin-card)">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-(--admin-muted)" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-75 w-full bg-(--admin-muted) rounded-lg" />
          </CardContent>
        </Card>
        <Card className="border-(--admin-border) bg-(--admin-card)">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-(--admin-muted)" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-75 w-full bg-(--admin-muted) rounded-lg" />
          </CardContent>
        </Card>
      </div>

      {/* Table Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-(--admin-border) bg-(--admin-card)">
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-(--admin-muted)" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-(--admin-muted)" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-(--admin-muted)" />
                    <Skeleton className="h-3 w-24 bg-(--admin-muted)" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16 bg-(--admin-muted)" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-(--admin-border) bg-(--admin-card)">
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-(--admin-muted)" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full bg-(--admin-muted)" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-(--admin-muted)" />
                    <Skeleton className="h-3 w-24 bg-(--admin-muted)" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full bg-(--admin-muted)" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AdminProductsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Search & Toolbars Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <Skeleton className="h-10 w-full sm:w-80 bg-(--admin-muted) rounded-xl" />

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                className="h-8 w-20 shrink-0 bg-(--admin-muted) rounded-xl"
              />
            ))}
          </div>
        </div>
        <Skeleton className="h-10 w-36 bg-(--admin-muted) rounded-xl" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border border-(--admin-border) bg-(--admin-card) rounded-3xl overflow-hidden shadow-sm"
          >
            <Skeleton className="aspect-4/3 w-full bg-(--admin-muted)" />
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-2/3 bg-(--admin-muted) rounded-md" />
                  <Skeleton className="h-6 w-16 bg-(--admin-muted) rounded-md" />
                </div>
                <Skeleton className="h-4 w-1/3 bg-(--admin-muted) rounded-md opacity-60" />
              </div>
              <div className="flex gap-3 pt-4 border-t border-(--admin-border)">
                <Skeleton className="h-10 flex-1 bg-(--admin-muted) rounded-xl" />
                <Skeleton className="h-10 flex-1 bg-(--admin-muted) rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminCategoriesSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Search & Toolbars Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Skeleton className="h-10 w-full sm:w-[320px] bg-(--admin-muted) rounded-xl" />
        <Skeleton className="h-10 w-36 bg-(--admin-muted) rounded-xl" />
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-(--admin-card) border border-(--admin-border)"
          >
            <Skeleton className="h-3 w-20 bg-(--admin-muted) mb-2 opacity-60" />
            <Skeleton className="h-8 w-16 bg-(--admin-muted) rounded-lg" />
          </div>
        ))}
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="border border-(--admin-border) bg-(--admin-card) rounded-2xl overflow-hidden shadow-sm"
          >
            <Skeleton className="h-32 w-full bg-(--admin-muted)" />
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 bg-(--admin-muted) rounded-md" />
                <Skeleton className="h-3 w-1/2 bg-(--admin-muted) rounded-md opacity-60" />
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <Skeleton className="h-4 w-4 bg-(--admin-muted) rounded-sm opacity-50" />
                <Skeleton className="h-4 w-20 bg-(--admin-muted) rounded-md opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
