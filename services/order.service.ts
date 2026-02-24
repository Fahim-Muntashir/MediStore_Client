import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const cookieStore = await cookies(); // ✅ await

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_URL}/customer/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
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
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },

  getOrderByUser: async () => {
    try {
      const cookieStore = await cookies(); // ✅ must await

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_URL}/customer/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
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
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
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
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      const text = await res.text();
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
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const cookieStore = await cookies(); // ✅ await

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_URL}/seller/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
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
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
  leaveReview: async (
    orderId: string,
    reviewData: {
      medicineId: string;
      rating: number;
      comment?: string;
    },
  ) => {
    try {
      const cookieStore = await cookies();

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_URL}/customer/orders/${orderId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.error || "Failed to submit review" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
};
