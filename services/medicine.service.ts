import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface MedicineData {
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  manufacturer: string;
  categoryIds?: string[];
}

export const medicineService = {
  createMedicine: async (medicineData: MedicineData) => {
    try {
      const cookieStore = await cookies(); // server-side cookies

      const res = await fetch(`${API_URL}/medicine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });
      const data = await res.json();
      console.log();

      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "Medicine not created" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getMedicines: async () => {
    try {
      const cookieStore = await cookies(); // ✅ await required in Next.js 16

      const res = await fetch(`${API_URL}/seller/medicines`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(), // ✅ works now
        },
        cache: "no-store",
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.error("getMedicines error:", error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
