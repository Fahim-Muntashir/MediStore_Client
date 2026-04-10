"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye, Heart, Pill } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { addMedicineToCart } from "@/actions/medicine.actions";
import { useCart } from "@/app/provider/cartProvider";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  manufacturer: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  categories: { id: string; name: string }[];
  rating?: number;
}

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stock > 0;
  const { refreshCart } = useCart();
  const rating = product.rating || 4.5; // Fallback rating

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;

    try {
      const { data, error } = await addMedicineToCart(product.id, 1);
      if (error) {
        toast.error(error.message || "Something went wrong");
        return;
      }
      toast.success(`${product.name} added to cart!`);
      refreshCart();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const firstCategory = typeof product.categories?.[0] === "string" 
    ? product.categories[0] 
    : product.categories?.[0]?.name || "General";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="group flex flex-col h-full overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30 shrink-0">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-2">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg" asChild>
              <Link href={`/shop/${product.id}`}><Eye className="h-4 w-4" /></Link>
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Badge 
            className="absolute top-3 left-3 rounded-full px-3 py-1 bg-white/90 text-black hover:bg-white backdrop-blur-sm"
          >
            {firstCategory}
          </Badge>

          {!inStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <Badge variant="destructive" className="px-4 py-1.5 rounded-full text-xs font-bold">OUT OF STOCK</Badge>
            </div>
          )}
        </div>

        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs font-bold ml-1">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-semibold">
              <Pill className="h-3 w-3" />
              {product.manufacturer}
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-relaxed mt-1">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-4 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-primary">${product.price.toFixed(2)}</span>
            {/* Fake original price for aesthetics */}
            <span className="text-xs text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <Button 
            onClick={handleAddToCart} 
            disabled={!inStock}
            className="w-full rounded-xl py-6 font-bold gap-2 group/btn"
          >
            <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
