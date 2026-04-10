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

  getCategories: async () => {
    try {
      const cookieStore = await cookies(); // Next.js cookies

      const res = await fetch(`${API_URL}/admin/categories`, {
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
          error: { message: data.error || "Failed to fetch categories" },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getDashboardStats: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/dashboard`, {
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
  },

  createCategory: async (formData: FormData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        return { data: null, error: { message: data.error || "Failed to create category" } };
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateCategory: async (id: string, formData: FormData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        return { data: null, error: { message: data.error || "Failed to update category" } };
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        const data = await res.json();
        return { error: { message: data.error || "Failed to delete category" } };
      }
      return { error: null };
    } catch (error) {
      return { error: { message: "Something went wrong" } };
    }
  }
};
