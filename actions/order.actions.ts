"use server";

import { orderService } from "@/services/order.service";

export const getOrdersByUser = async () => {
  return await orderService.getOrderByUser();
};

export const getOrdersBySeller = async () => {
  const res = await orderService.getSellerOrders();
  return res;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  console.log(orderId, status);
  return await orderService.updateOrderStatus(orderId, status);
};
