"use client";

import React, { useEffect, useState } from "react";
import { fetchAllMedicines } from "@/actions/medicine.actions";
import { ProductCard } from "@/components/modules/medicine/product-card";
import { getAllCategories } from "@/actions/admin.action";

const ShopPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Fetch categories once
  useEffect(() => {
    const loadCategories = async () => {
      const data = await getAllCategories();
      console.log(data);
      setCategories(data.data);
    };

    loadCategories();
  }, []);

  // Fetch medicines when filters change
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllMedicines({
        search,
        category: categoryFilter,
        manufacturer: manufacturerFilter,
        maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      });

      if (!response.error) {
        setMedicines(response.data);
      }
    };

    fetchData();
  }, [search, categoryFilter, manufacturerFilter, maxPrice]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Medicines</h1>

        <div className="mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />

          {/* ✅ Dynamic Categories */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories?.map((cat: any) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Manufacturer"
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {medicines.map((product: any) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                categories: product.categories.map((c: any) => c.name),
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
