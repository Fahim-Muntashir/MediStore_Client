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

export const placeOrder = async (orderData: {
  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "cod" | "online";
}) => {
  // Pass an empty items array if needed by service, but service should probably get it from cart on backend
  return await orderService.createOrder({ ...orderData, items: [] });
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
