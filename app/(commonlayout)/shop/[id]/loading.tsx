import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCardSkeleton } from "@/components/modules/skeletons";

export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b bg-secondary/10">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="relative aspect-[4/3] rounded-3xl" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
            <div className="pt-8 space-y-6">
              <Skeleton className="h-12 w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-20 rounded-2xl" />
                  <Skeleton className="h-20 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <Card className="rounded-[2rem] border shadow-xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-24 w-full rounded-2xl" />
                  <div className="space-y-3">
                    <Skeleton className="h-14 w-full rounded-2xl" />
                    <Skeleton className="h-14 w-full rounded-2xl" />
                  </div>
                </CardContent>
              </Card>
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-24 border-t pt-24 space-y-12">
          <div className="space-y-4">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
