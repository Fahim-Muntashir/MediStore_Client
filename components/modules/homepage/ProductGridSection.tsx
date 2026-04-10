"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../medicine/product-card";
import Link from "next/link";

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  products: any[];
  viewAllLink?: string;
  className?: string;
}

export function ProductGridSection({ 
  title, 
  subtitle, 
  products, 
  viewAllLink = "/shop",
  className = ""
}: ProductGridSectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              <Sparkles className="h-3 w-3" />
              TOP RATED
            </div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          <Button variant="ghost" asChild className="gap-2 group">
            <Link href={viewAllLink}>
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            // Skeleton Loader (conceptual)
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-secondary/50 animate-pulse" />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
