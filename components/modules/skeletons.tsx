import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="rounded-2xl border-none shadow-sm overflow-hidden h-[450px]">
      <Skeleton className="h-[250px] w-full" />
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </CardContent>
    </Card>
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
