const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const blogService = {
  getAllBlogs: async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || data.error) return { data: null, error: data.error };
      return { data: data.data, error: null }; // Expecting our express response: { success: true, data: [...] }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch blogs" } };
    }
  },

  getSingleBlog: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || data.error) return { data: null, error: data.error };
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch blog" } };
    }
  }
};
