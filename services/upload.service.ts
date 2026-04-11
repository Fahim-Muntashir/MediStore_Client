"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadService = {
  uploadImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      return { data: data.data, error: null };
    } catch (error: any) {
      console.error("Upload Service Error:", error);
      return { 
        data: null, 
        error: { message: error.message || "Something went wrong" } 
      };
    }
  },
};
