"use server";

import { MedicineData, medicineService } from "@/services/medicine.service";
import { updateTag } from "next/cache";

// Fetch all medicines
export const getMedicines = async () => {
  return await medicineService.getSellerMedicines();
};

// Create a new medicine
export const createMedicine = async (data: MedicineData) => {
  const res = await medicineService.createMedicine(data);
  updateTag("blogPosts"); // invalidate cache
  console.log(res);
  return res;
};

// NEW: Update an existing medicine
export const updateMedicine = async (id: string, data: MedicineData) => {
  const res = await medicineService.updateMedicine(id, data);
  updateTag("blogPosts"); // invalidate cache
  console.log(res);
  return res;
};
// NEW: Delete an existing medicine
export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  updateTag("blogPosts"); // invalidate cache
  console.log(res);
  return res;
};
export const fetchAllMedicines = async () => {
  const res = await medicineService.getAllMedicines();
  console.log(res);
  return res;
};
