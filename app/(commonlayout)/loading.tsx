import React from "react";
import { 
  ProductCardSkeleton, 
  StatisticsSkeleton, 
  ProductGridSkeleton, 
  BlogPreviewSkeleton,
  CategoryCardSkeleton,
  WhyChooseSkeleton
} from "@/components/modules/skeletons";
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

      <div className="space-y-0">
        {/* Categories Skeleton */}
        <section className="py-24 container px-4">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-12 w-80 mx-auto rounded-xl" />
            <Skeleton className="h-5 w-[600px] mx-auto rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Featured Products Skeleton */}
        <ProductGridSkeleton featured={true} />

        {/* Why Choose Section Skeleton */}
        <WhyChooseSkeleton />

        {/* Popular Products Skeleton */}
        <ProductGridSkeleton />

        {/* Statistics Section Skeleton */}
        <section className="container px-4 py-20">
          <StatisticsSkeleton />
        </section>
        
        {/* Blog Preview Skeleton */}
        <BlogPreviewSkeleton />
        
        {/* Generic Skeletons for the rest */}
        <section className="container px-4 py-20 space-y-12">
           <Skeleton className="h-[400px] w-full rounded-[3rem]" />
        </section>
      </div>
    </div>
  );
}
