"use server";

import { MedicineData, medicineService } from "@/services/medicine.service";
import { updateTag } from "next/cache";

export const getMedicines = async () => {
  return await medicineService.getMedicines();
};

export const createMedicine = async (data: MedicineData) => {
  const res = await medicineService.createMedicine(data);
  updateTag("blogPosts");
  console.log(res);
  return res;
};
