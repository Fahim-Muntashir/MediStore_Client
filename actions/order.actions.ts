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
  return await orderService.updateOrderStatus(orderId, status);
};

// ----------------- Review Bridge -----------------
export const leaveReview = async (
  orderId: string,
  reviewData: {
    medicineId: string;
    rating: number;
    comment?: string;
  },
) => {
  const res = await orderService.leaveReview(orderId, reviewData);
  console.log(res);
  return res;
};
