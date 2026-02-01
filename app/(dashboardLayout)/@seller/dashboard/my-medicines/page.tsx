"use client";

import { useEffect, useState } from "react";
import { getMedicines } from "@/actions/medicine.actions";
import { MedicineRow } from "@/components/modules/medicine/medicine-row";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { CardTitle } from "@/components/ui/card";

export default function MyMedicinesClient({
  initialMedicines,
}: {
  initialMedicines?: any[];
}) {
  const [medicines, setMedicines] = useState(initialMedicines || []);
  const [loading, setLoading] = useState(!initialMedicines);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialMedicines) {
      setLoading(true);
      getMedicines()
        .then((res) => setMedicines(Array.isArray(res?.data) ? res.data : []))
        .catch((err) => {
          console.error(err);
          setError("Failed to load medicines");
        })
        .finally(() => setLoading(false));
    }
  }, [initialMedicines]);

  const handleEdit = (product: any) => console.log("Edit:", product);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/v1/medicine/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMedicines((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <CardTitle className="pb-4 text-2xl">My Medicines</CardTitle>
      <Table className="mx-10">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicines.map((product) => (
            <MedicineRow
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
