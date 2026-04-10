import React from "react";
import { ProductCardSkeleton, StatisticsSkeleton } from "@/components/modules/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Skeleton */}
      <div className="relative h-[600px] md:h-[700px] bg-secondary/30 animate-pulse flex items-center">
        <div className="container px-4 space-y-6">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-20 w-3/4 max-w-2xl" />
          <Skeleton className="h-8 w-1/2 max-w-lg" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
      </div>

      <div className="space-y-20 py-20 bg-background">
        {/* Categories Skeleton */}
        <section className="container px-4">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 rounded-3xl" />
            ))}
          </div>
        </section>

        {/* Product Grid Skeleton (Featured) */}
        <section className="bg-secondary/20 py-24">
          <div className="container px-4 space-y-12">
            <div className="space-y-4">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section Skeleton */}
        <section className="container px-4 py-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <Skeleton className="h-[400px] rounded-3xl" />
              <div className="space-y-6">
                <Skeleton className="h-10 w-80" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
                </div>
              </div>
           </div>
        </section>

        {/* Statistics Section Skeleton */}
        <section className="container px-4">
          <StatisticsSkeleton />
        </section>

        {/* Popular Grid Skeleton */}
        <section className="py-24">
          <div className="container px-4 space-y-12">
            <div className="space-y-4">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
