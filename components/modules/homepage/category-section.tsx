"use client";

import React, { useEffect, useState } from "react";
import { Pill, LayoutGrid } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { getAllCategories } from "@/actions/admin.action";

export function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      setIsLoading(true);
      const { data } = await getAllCategories();
      if (data) setCategories(data);
      setIsLoading(false);
    };
    fetchCats();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background" id="categories">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-black text-foreground md:text-5xl tracking-tight">
            Browse by <span className="text-primary italic">Category</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Find the right medicines for your needs. Browse our wide selection
            of verified healthcare products.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-3xl bg-secondary/30 animate-pulse border border-secondary" />
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Link href={`/shop?category=${encodeURIComponent(category.name)}`} key={category.id}>
                <Card
                  className="group relative cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-primary/50 bg-card h-full rounded-3xl overflow-hidden border-secondary/50"
                >
                  <CardContent className="p-8 h-full flex flex-col relative z-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50 border border-secondary transition-all duration-500 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                      ) : (
                        <Pill className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                      )}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Explore our top-quality {category.name.toLowerCase()} products selected by health experts.
                    </p>
                    <div className="mt-6 flex items-center text-primary font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                      View Products 
                      <LayoutGrid className="h-4 w-4" />
                    </div>
                  </CardContent>
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <LayoutGrid className="h-24 w-24 text-primary" />
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-secondary/10 rounded-3xl border border-dashed">
              <p className="text-muted-foreground font-medium">No categories available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
