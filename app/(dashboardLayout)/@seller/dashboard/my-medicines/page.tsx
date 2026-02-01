import { getMedicines } from "@/actions/medicine.actions";
import { ProductCard } from "@/components/modules/medicine/medicine-card";

export default async function Home() {
  const res = await getMedicines();

  console.log("API RESPONSE:", res);

  const medicines = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
      ? res
      : [];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Products</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {medicines.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
