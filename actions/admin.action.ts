"use server";

import { adminService } from "@/services/admin.service";

export const getAllUsers = async () => {
  return await adminService.getAllUsers();
};

export const updateUserStatus = async (userId: string, status: string) => {
  return await adminService.updateUserStatus(userId, status);
};

export const getAllOrders = async () => {
  return await adminService.getAllOrders();
};
