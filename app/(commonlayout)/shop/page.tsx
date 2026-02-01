"use client"; // Client-side interactivity
import React, { useEffect, useState } from "react";
import { fetchAllMedicines } from "@/actions/medicine.actions";
import { ProductCard } from "@/components/modules/medicine/product-card";

// Medicine type
type Medicine = {
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
  categories: { id: string; name: string }[]; // categories as objects
};

const ShopPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filtered, setFiltered] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Fetch medicines on mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllMedicines();
      if (response.error) {
        console.error("Failed to fetch medicines:", response.error.message);
        return;
      }
      setMedicines(response.data);
      setFiltered(response.data);
    };
    fetchData();
  }, []);

  // Filter medicines whenever search/filters change
  useEffect(() => {
    let result = medicines;

    if (search) {
      result = result.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (categoryFilter) {
      result = result.filter((m) =>
        m.categories.some((c) => c.name === categoryFilter),
      );
    }

    if (manufacturerFilter) {
      result = result.filter(
        (m) =>
          m.manufacturer.toLowerCase() === manufacturerFilter.toLowerCase(),
      );
    }

    if (maxPrice !== "") {
      result = result.filter((m) => m.price <= Number(maxPrice));
    }

    setFiltered(result);
  }, [search, categoryFilter, manufacturerFilter, maxPrice, medicines]);

  // Get unique categories and manufacturers for dropdowns
  const categories = Array.from(
    new Set(medicines.flatMap((m) => m.categories.map((c) => c.name))),
  );
  const manufacturers = Array.from(
    new Set(medicines.map((m) => m.manufacturer)),
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Medicines</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-1/3"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-1/4"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-1/4"
          >
            <option value="">All Manufacturers</option>
            {manufacturers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="p-2 border border-gray-300 rounded w-full sm:w-1/6"
          />
        </div>

        {/* Products */}
        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  categories: product.categories.map((c) => c.name), // fix type
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No medicines found</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
