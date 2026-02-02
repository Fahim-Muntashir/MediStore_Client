"use server";
// actions/profile.actions.ts
import {
  getProfileServe,
  updateProfileServe,
} from "@/services/profile.service";

/**
 * Fetch profile bridge
 */
export const fetchProfile = async () => {
  const res = await getProfileServe();
  return res; // just fetch, no updateTag
};

/**
 * Update profile bridge
 * @param profileData Partial profile data including optional image
 */
export const updateProfile = async (
  profileData: Partial<{
    name: string;
    phone?: string | null;
    shippingAddress?: string | null;
    image?: string | null;
  }>,
) => {
  const res = await updateProfileServe(profileData);
  return res; // { data, error }
};
