"use client";

import { useCart } from "@/app/provider/cartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, loading, refreshCart } = useCart();

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.medicine.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="bg-background min-h-screen pb-20">
        <div className="bg-secondary/30 border-b py-12 animate-pulse">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-card border rounded-3xl p-6 flex gap-6">
                  <Skeleton className="h-24 w-24 rounded-2xl shrink-0" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="hidden md:flex flex-col items-end justify-between py-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-24 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="bg-card border-2 rounded-[2.5rem] p-8 space-y-8">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-4">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-secondary/30 border-b py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">You have {cartItems.length} items in your cart.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center space-y-6 pt-20"
          >
            <div className="bg-secondary/50 p-8 rounded-full inline-block">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground leading-relaxed">Looks like you haven't added any medicines yet. Start exploring our shop to find what you need.</p>
            <Button asChild size="lg" className="rounded-full px-10">
              <Link href="/shop">Browse Medicines</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item: any) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-card border rounded-3xl p-4 md:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center">
                        <div className="col-span-1 md:col-span-6 flex gap-4">
                          <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-secondary/30 shrink-0">
                            <Image 
                              src={item.medicine.image} 
                              alt={item.medicine.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {item.medicine.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2">{item.medicine.manufacturer}</p>
                            <button className="flex items-center gap-1 text-xs text-destructive font-bold hover:underline mt-1">
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 text-center font-bold">
                          ${item.medicine.price.toFixed(2)}
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-center">
                          <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-xl border border-secondary">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-background shadow-sm">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-background shadow-sm">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 text-right font-black text-primary text-xl">
                          ${(item.medicine.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="ghost" asChild className="gap-2 font-bold">
                  <Link href="/shop">
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline" className="text-destructive hover:bg-destructive/10 border-destructive/20 font-bold rounded-xl">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <Card className="rounded-[2.5rem] border-2 shadow-xl overflow-hidden">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-black mb-8">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-muted-foreground font-medium">
                        <span>Subtotal</span>
                        <span className="text-foreground">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground font-medium">
                        <span>Shipping Fee</span>
                        <span className="text-foreground">${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground font-medium">
                        <span>Tax (Estimated)</span>
                        <span className="text-foreground">$0.00</span>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="flex justify-between items-baseline mb-8">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                      </div>

                      <Button size="lg" className="w-full h-16 rounded-2xl font-black text-lg spotlight shadow-lg group" asChild>
                        <Link href="/checkout">
                          Checkout Now
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-8 space-y-4 pt-8 border-t">
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span>SECURE CHECKOUT GUARANTEED</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                        <Truck className="h-4 w-4 text-primary" />
                        <span>FAST DOORSTEP DELIVERY</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Promo Code Card */}
                <Card className="rounded-2xl border p-6 bg-secondary/20">
                  <p className="text-sm font-bold mb-3">HAVE A PROMO CODE?</p>
                  <div className="flex gap-2">
                    <input 
                      placeholder="Enter code" 
                      className="flex-1 bg-background border rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button variant="secondary" className="rounded-xl font-bold">Apply</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
