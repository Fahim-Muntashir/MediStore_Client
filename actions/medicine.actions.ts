"use server";
type MedicineQueryParams = {
  search?: string;
  category?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
};

import { MedicineData, medicineService } from "@/services/medicine.service";
import { orderService } from "@/services/order.service";
import { revalidatePath } from "next/cache";

// Fetch all medicines
export const getMedicines = async () => {
  return await medicineService.getSellerMedicines();
};

// Create a new medicine
export const createMedicine = async (data: MedicineData) => {
  const res = await medicineService.createMedicine(data);
  revalidatePath("/");
  return res;
};

export const updateMedicine = async (id: string, data: MedicineData) => {
  const res = await medicineService.updateMedicine(id, data);
  revalidatePath("/");
  return res;
};
export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  revalidatePath("/");
  return res;
};
export const fetchAllMedicines = async (params?: {
  search?: string;
  category?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return await medicineService.getAllMedicines(params);
};

export const fetchSingleMedicineDetails = async (id: string) => {
  const res = await medicineService.getSingleMedicineDetails(id);
  return res;
};

export const addMedicineToCart = async (id: string, quantity: number = 1) => {
  const res = await medicineService.addToCartMedicine(id, quantity);
  return res;
};

export const fetchCartItems = async () => {
  const res = await medicineService.getAllCartItems();
  return {
    success: !res.error,
    data: res.data,
    error: res.error,
  };
};

export const placeOrder = async (orderData: {
  items: any[];
  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "cod" | "online";
}) => {
  const res = await orderService.createOrder(orderData);

  return {
    success: !res.error,
    data: res.data,
    error: res.error,
  };
};
export const fetchFeaturedMedicines = async () => {
  return await medicineService.getFeaturedMedicines();
};

export const fetchPopularMedicines = async () => {
  return await medicineService.getPopularMedicines();
};

export const toggleMedicineFeatured = async (id: string, isFeatured: boolean) => {
  const res = await medicineService.toggleMedicineFeatured(id, isFeatured);
  revalidatePath("/");
  return res;
};
