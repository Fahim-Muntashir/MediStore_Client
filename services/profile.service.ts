import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const getProfileServe = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "Profile not fetched" },
      };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something went wrong" } };
  }
};

/**
 * Update profile on the server
 * @param profileData Partial profile data including optional image
 */
export const updateProfileServe = async (
  profileData: Partial<{
    name: string;
    phone?: string | null;
    shippingAddress?: string | null;
    image?: string | null;
  }>,
) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT", // or PUT depending on your API
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      return {
        data: null,
        error: { message: data.error || "Profile not updated" },
      };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something went wrong" } };
  }
};
