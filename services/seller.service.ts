import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sellerService = {
  getDashboardStats: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/seller/dashboard`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store"
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch dashboard stats" } };
    }
  }
};
