import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

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
      const cookieStore = cookies(); // no need await

      const res = await fetch(`${API_URL}/customer/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
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

  getOrderByUser: async () => {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${API_URL}/customer/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
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

  getSellerOrders: async () => {
    try {
      const cookieStore = await cookies(); // ✅ must await

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_URL}/seller/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // ✅ correct way
        },
        cache: "no-store",
      });

      const text = await res.text(); // ✅ prevent JSON parse error
      let data: any;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("API returned non-JSON:", text);
        return {
          data: null,
          error: { message: "Backend returned invalid response (not JSON)" },
        };
      }
      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.error || "Failed to fetch seller orders" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      // Await the cookies() call
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/seller/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(), // now safe
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.error || "Failed to update order status" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
