import { fetchAllMedicines } from "@/actions/medicine.actions";
import { ProductCard } from "@/components/modules/medicine/product-card";
import React from "react";

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
  categories: string[];
};

const ShopPage = async () => {
  // Fetch medicines and handle the response
  const response = await fetchAllMedicines();

  // Check for errors
  if (response.error) {
    console.error("Failed to fetch medicines:", response.error.message);
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-red-500">Failed to load medicines.</p>
        </div>
      </main>
    );
  }

  // response.data should be Medicine[]
  const medicines: Medicine[] = response.data;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Medicines</h1>

        {medicines && medicines.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {medicines.map((product) => (
              <ProductCard key={product.id} product={product} />
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
