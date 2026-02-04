import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  // ✅ Admin: Get all users
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/users`, {
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
          error: { message: data.error || "Failed to fetch users" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ✅ Admin: Ban / Unban User (update status string)
  updateUserStatus: async (userId: string, status: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.error || "Failed to update user status" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getAllOrders: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/orders`, {
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
};
