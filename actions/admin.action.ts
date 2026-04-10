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

export const getAllCategories = async () => {
  return await adminService.getCategories();
};

export const createCategoryAction = async (formData: FormData) => {
  return await adminService.createCategory(formData);
};

export const updateCategoryAction = async (id: string, formData: FormData) => {
  return await adminService.updateCategory(id, formData);
};

export const deleteCategoryAction = async (id: string) => {
  return await adminService.deleteCategory(id);
};
