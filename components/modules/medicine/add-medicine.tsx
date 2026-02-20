"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createMedicine } from "@/actions/medicine.actions";
import { getAllCategories } from "@/actions/admin.action";

const medicineSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  manufacturer: z.string().min(2),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Price must be greater than 0"),
  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Stock cannot be negative"),
  image: z.string().url(),
  categories: z.array(z.string()).optional().default([]),
});

export default function AddMedicineForm() {
  const [categoriesOptions, setCategoriesOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (!res.error && res.data) {
        setCategoriesOptions(res.data);
      }
    };
    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      manufacturer: "",
      price: "",
      stock: "",
      image: "",
      categories: [] as string[],
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const medicineData = {
        name: value.name,
        description: value.description,
        manufacturer: value.manufacturer,
        price: Number(value.price),
        stock: Number(value.stock),
        image: value.image,
        categories: selectedCategories.map((c) => c.id),
      };

      try {
        const res = await createMedicine(medicineData);

        console.log(res, "Darta createtion eror");
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        form.reset();
        setSelectedCategories([]);
        toast.success("Medicine Created", { id: toastId });
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  const addCategory = (id: string) => {
    const category = categoriesOptions.find((c) => c.id === id);
    if (category && !selectedCategories.find((c) => c.id === id)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const removeCategory = (id: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Card className="lg:mx-80">
      <CardHeader>
        <CardTitle className="font-bold text-3xl">Add New Medicine</CardTitle>
        <CardDescription>
          Fill in the details to add a new medicine to your store
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="add-medicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel>Medicine Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Manufacturer */}
            <form.Field
              name="manufacturer"
              children={(field) => (
                <Field>
                  <FieldLabel>Manufacturer</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Price */}
            <form.Field
              name="price"
              children={(field) => (
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    value={field.state.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*\.?\d*$/.test(val)) {
                        field.handleChange(val);
                      }
                    }}
                    className="!appearance-none"
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Stock */}
            <form.Field
              name="stock"
              children={(field) => (
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={field.state.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        field.handleChange(val);
                      }
                    }}
                    className="!appearance-none"
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Image */}
            <form.Field
              name="image"
              children={(field) => (
                <Field>
                  <FieldLabel>Image URL</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Category Select */}
            <Field>
              <FieldLabel>Categories</FieldLabel>
              <select
                onChange={(e) => addCategory(e.target.value)}
                className="border rounded p-2 w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoriesOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Display selected categories as tags */}
              <div className="flex flex-wrap mt-2 gap-2">
                {selectedCategories.map((c) => (
                  <div
                    key={c.id}
                    className="bg-blue-200 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <span>{c.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCategory(c.id)}
                      className="text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" form="add-medicine-form" className="w-full">
          Add Medicine
        </Button>
      </CardFooter>
    </Card>
  );
}
