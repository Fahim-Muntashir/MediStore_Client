"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { updateMedicine } from "@/actions/medicine.actions";
import { useRouter } from "next/navigation";
import { deleteMedicine } from "@/actions/medicine.actions";

export interface MedicineData {
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  manufacturer: string;
  categoryIds?: string[];
}

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
  categories: string[];
}

interface MedicineRowProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export function MedicineRow({ product, onEdit, onDelete }: MedicineRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const inStock = product.stock > 0;
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: product.name,
      manufacturer: product.manufacturer,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
    },
    onSubmit: async ({ value }) => {
      try {
        const updatedData: MedicineData = {
          name: value.name,
          manufacturer: value.manufacturer,
          description: value.description,
          price: Number(value.price),
          stock: Number(value.stock),
          image: value.image,
        };

        const { data, error } = await updateMedicine(product.id, updatedData);

        if (error) {
          toast.error(error.message);
          return;
        }

        const updatedProduct: Product = {
          ...product,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        };
        onEdit?.(updatedProduct);
        setIsEditModalOpen(false);

        toast.success(
          "Product updated successfully! reload this page to get update data",
          {
            description: `${updatedProduct.name} has been updated.`,
          },
        );
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while updating the product.");
      }
    },
  });

  // Inside MedicineRow
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;

    try {
      const res = await deleteMedicine(product.id); // call your API

      toast.success(
        `${product.name} has been deleted. Please reload the page to see updates.`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting the medicine.");
    }
  };

  const handleOpenEditModal = () => {
    form.reset();
    setIsEditModalOpen(true);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="p-2 w-20">
          <div className="relative h-12 w-12">
            <Image
              src={product?.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded"
              priority
            />
          </div>
        </td>

        <td className="p-2">
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-sm text-gray-500">
              {product.manufacturer}
            </span>
          </div>
        </td>

        <td className="p-2 text-green-600 font-bold">
          ${product.price.toFixed(2)}
        </td>

        <td className="p-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">{product.stock.toLocaleString()}</span>
            <Badge variant={inStock ? "default" : "destructive"}>
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </td>

        <td className="p-2 text-xs text-gray-400">
          {new Date(product.updatedAt).toLocaleDateString()}
        </td>

        <td className="flex gap-2 p-2">
          <button
            onClick={handleOpenEditModal}
            className="rounded-md bg-blue-600 px-3 py-1 text-white text-sm hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-1 text-white text-sm hover:bg-red-700 transition"
          >
            Delete
          </button>
        </td>
      </tr>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below. Click update when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid gap-4 py-4">
              <form.Field
                name="name"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />

              <form.Field
                name="manufacturer"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="price"
                  children={(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)} // keep as string
                      />
                    </div>
                  )}
                />

                <form.Field
                  name="stock"
                  children={(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
              </div>

              <form.Field
                name="description"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />

              <form.Field
                name="image"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                )}
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
