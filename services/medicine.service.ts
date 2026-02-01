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

  getSellerMedicines: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/seller/medicines`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
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
  addToCartMedicine: async (id: string, quantity: number = 1) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customer/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ productId: id, quantity }),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      console.error("addToCartMedicine error:", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },

  getAllMedicines: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicine`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
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
  getSingleMedicineDetails: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicine/${id}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.error("getSingleMedicineDetails error:", error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateMedicine: async (id: string, medicineData: MedicineData) => {
    try {
      const cookieStore = await cookies(); // server-side cookies

      const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
        method: "PUT", // or PATCH if your API supports partial updates
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
        cache: "no-store", // ensures fresh data
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "Medicine not updated" },
        };
      }

      return { data, error: null };
    } catch (error) {
      console.error("updateMedicine error:", error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  deleteMedicine: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (data.error) {
        return { error: { message: data.error || "Medicine not deleted" } };
      }

      return { error: null };
    } catch (error) {
      console.error("deleteMedicine error:", error);
      return { error: { message: "Something went wrong" } };
    }
  },
};
