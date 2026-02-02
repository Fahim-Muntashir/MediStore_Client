"use server";

import { orderService } from "@/services/order.service";

// Fetch orders of logged-in user
export const getOrdersByUser = async () => {
  return await orderService.getOrderByUser();
};
