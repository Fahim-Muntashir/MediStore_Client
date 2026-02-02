"use server";

import { MedicineData, medicineService } from "@/services/medicine.service";
import { orderService } from "@/services/order.service";
import { updateTag } from "next/cache";

// Fetch all medicines
export const getMedicines = async () => {
  return await medicineService.getSellerMedicines();
};

// Create a new medicine
export const createMedicine = async (data: MedicineData) => {
  const res = await medicineService.createMedicine(data);
  updateTag("blogPosts");
  return res;
};

export const updateMedicine = async (id: string, data: MedicineData) => {
  const res = await medicineService.updateMedicine(id, data);
  updateTag("blogPosts");
  return res;
};
export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  updateTag("blogPosts");
  return res;
};
export const fetchAllMedicines = async () => {
  const res = await medicineService.getAllMedicines();
  return res;
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
