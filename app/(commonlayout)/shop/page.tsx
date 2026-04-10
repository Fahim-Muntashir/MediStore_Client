"use client";

import React, { useEffect, useState } from "react";
import { fetchAllMedicines } from "@/actions/medicine.actions";
import { ProductCard } from "@/components/modules/medicine/product-card";
import { getAllCategories } from "@/actions/admin.action";
import { Search, Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useSearchParams } from "next/navigation";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [medicines, setMedicines] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  // Sync category filter with URL search params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategoryFilter(cat);
    } else {
      setCategoryFilter("all");
    }
  }, [searchParams]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getAllCategories();
      setCategories(data.data || []);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchAllMedicines({
        search,
        category: categoryFilter === "all" ? "" : categoryFilter,
        manufacturer: manufacturerFilter,
      });

      if (!response.error) {
        let sortedData = [...(response.data || [])];
        
        if (availabilityFilter === "in-stock") sortedData = sortedData.filter(m => m.stock > 0);
        if (availabilityFilter === "out-of-stock") sortedData = sortedData.filter(m => m.stock === 0);
        if (ratingFilter !== "all") sortedData = sortedData.filter(m => (m.rating || 4.5) >= Number(ratingFilter));

        if (sortBy === "price-low") sortedData.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") sortedData.sort((a, b) => b.price - a.price);
        setMedicines(sortedData);
        setCurrentPage(1);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [search, categoryFilter, manufacturerFilter, availabilityFilter, ratingFilter, sortBy]);

  const paginatedMedicines = medicines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-secondary/30 border-b py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-4">Shop Medicines</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span className="text-foreground font-medium">Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8 shrink-0">
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setCategoryFilter("all")}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${categoryFilter === "all" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-secondary text-muted-foreground"}`}
                >
                  All Categories
                </button>
                {categories?.map((cat: any) => (
                  <button 
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.name)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${categoryFilter === cat.name ? "bg-primary text-primary-foreground font-bold" : "hover:bg-secondary text-muted-foreground"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-bold">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Min" type="number" className="h-9 text-xs" />
                <Input placeholder="Max" type="number" className="h-9 text-xs" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-bold">Availability</h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "All Items" },
                  { id: "in-stock", label: "In Stock" },
                  { id: "out-of-stock", label: "Out of Stock" }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="availability" 
                      checked={availabilityFilter === option.id}
                      onChange={() => setAvailabilityFilter(option.id)}
                      className="accent-primary"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-bold">Rating</h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "Any Rating" },
                  { id: "4", label: "4 Stars & Up" },
                  { id: "3", label: "3 Stars & Up" }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={ratingFilter === option.id}
                      onChange={() => setRatingFilter(option.id)}
                      className="accent-primary"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Manufacturer</h3>
              <Input 
                placeholder="Search brand..." 
                value={manufacturerFilter}
                onChange={(e) => setManufacturerFilter(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <h4 className="font-bold text-sm mb-2 font-primary">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Our pharmacists are available 24/7 to answer your health questions.</p>
              <Button variant="outline" size="sm" className="w-full text-xs">Contact Support</Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border shadow-sm">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search medicines..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 bg-secondary/30 border-none rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-10 w-[160px] rounded-xl border-none bg-secondary/30">
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="hidden sm:flex border rounded-xl overflow-hidden p-1 bg-secondary/30">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-background shadow-sm">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{medicines.length}</span> results
              </p>
              <div className="flex gap-2">
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1">
                    {categoryFilter}
                    <ChevronDown className="h-3 w-3 rotate-45 cursor-pointer" onClick={() => setCategoryFilter("all")} />
                  </Badge>
                )}
                {availabilityFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1">
                    {availabilityFilter === "in-stock" ? "In Stock" : "Out of Stock"}
                    <ChevronDown className="h-3 w-3 rotate-45 cursor-pointer" onClick={() => setAvailabilityFilter("all")} />
                  </Badge>
                )}
                {ratingFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1">
                    {ratingFilter}+ Stars
                    <ChevronDown className="h-3 w-3 rotate-45 cursor-pointer" onClick={() => setRatingFilter("all")} />
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-[400px] rounded-2xl bg-secondary/30 animate-pulse border" />
                ))
              ) : paginatedMedicines.length > 0 ? (
                paginatedMedicines.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      categories: product.categories.map((c: any) => c.name),
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center space-y-4">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">No medicines found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search keywords.</p>
                  <Button onClick={() => {
                    setSearch("");
                    setCategoryFilter("all");
                    setManufacturerFilter("");
                  }}>Clear All Filters</Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "ghost"}
                      className={`h-10 w-10 p-0 ${currentPage === i + 1 ? "rounded-xl font-bold rounded-xl" : "rounded-xl"}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
