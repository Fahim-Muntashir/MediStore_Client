import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="rounded-3xl border-none shadow-sm overflow-hidden h-full flex flex-col group">
      <Skeleton className="aspect-[4/5] w-full" />
      <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CategoryCardSkeleton = () => {
  return (
    <Card className="rounded-3xl border-secondary/50 shadow-sm overflow-hidden h-48 animate-pulse">
      <CardContent className="p-8 h-full flex flex-col">
        <Skeleton className="h-16 w-16 rounded-2xl mb-6" />
        <Skeleton className="h-6 w-32 rounded-lg mb-3" />
        <Skeleton className="h-4 w-full rounded-md" />
      </CardContent>
    </Card>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <Card className="rounded-2xl border shadow-sm overflow-hidden h-full flex flex-col">
      <Skeleton className="aspect-[16/10] w-full" />
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-7 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <div className="mt-auto pt-4">
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductGridSkeleton = ({ title = true, featured = false }: { title?: boolean, featured?: boolean }) => {
  return (
    <section className={`py-20 ${featured ? "bg-secondary/20" : ""}`}>
      <div className="container mx-auto px-4">
        {title && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-10 w-80 rounded-lg" />
              <Skeleton className="h-5 w-[450px] rounded-md" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const OrderCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader className="bg-muted/50 border-b py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-4 w-12" />
            <div className="space-y-3">
              {[1, 2].map((j) => (
                <div key={j} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const BlogPreviewSkeleton = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <Skeleton className="h-10 w-96 rounded-lg" />
            <Skeleton className="h-5 w-[600px] rounded-md" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhyChooseSkeleton = () => {
  return (
    <section className="container px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Skeleton className="h-[500px] rounded-[3rem]" />
        <div className="space-y-8">
          <Skeleton className="h-12 w-96 rounded-xl" />
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3 p-6 rounded-3xl border border-secondary/50">
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <Skeleton className="h-6 w-32 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const StatisticsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="text-center space-y-3 p-8 rounded-3xl bg-white shadow-sm border animate-pulse">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-8 w-24 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
};
