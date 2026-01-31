"use client";

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
import { useRouter } from "next/navigation";

// Zod schema
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
  categories: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : [],
    ),
});

export default function AddMedicineForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      manufacturer: "",
      price: "", // string input for numeric
      stock: "", // string input for numeric
      image: "",
      categories: "",
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
        categories: value.categories
          ? value.categories
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : [],
      };

      try {
        const res = await createMedicine(medicineData);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        form.reset();
        toast.success("Medcine Created", { id: toastId });
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  }); // <- this closes useForm

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
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel>Medicine Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Manufacturer */}
            <form.Field
              name="manufacturer"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel>Manufacturer</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Price */}
            <form.Field
              name="price"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Stock */}
            <form.Field
              name="stock"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Image URL */}
            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Categories */}
            <form.Field
              name="categories"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel>Categories (comma-separated)</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
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
