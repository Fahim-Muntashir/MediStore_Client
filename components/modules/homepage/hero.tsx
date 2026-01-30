"use client";

import { Search, ShoppingCart, CheckCircle, Truck, Pill } from "lucide-react";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-secondary py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Buy Trusted Medicines Online — Fast & Safe
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl text-pretty">
            Explore verified OTC medicines from reliable sellers. Delivered to
            your doorstep.
          </p>

          <div className="mx-auto mb-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button size="lg" className="h-12 px-6">
              <Search className="mr-2 h-4 w-4" />
              Search Medicines
            </Button>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shop Medicines
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-card">
              <Search className="h-5 w-5" />
              Search Medicines
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm border border-border">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Verified Sellers
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm border border-border">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Fast Delivery
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm border border-border">
              <Pill className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                1000+ Medicines
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
