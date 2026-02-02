import { cookies } from "next/headers";

const API_URL = process.env.API_URL; // Make sure this is set in your environment

export const orderService = {
  createOrder: async (orderData: {
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
    try {
      const cookieStore = await cookies(); // server-side cookies

      const res = await fetch(`${API_URL}/customer/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "Order not created" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  // ✅ Get orders by logged-in user
  getOrderByUser: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customer/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store", // avoid caching in Next.js
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.error || "Failed to fetch orders" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
