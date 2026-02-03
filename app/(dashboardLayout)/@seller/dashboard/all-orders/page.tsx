"use client";

import React, { useState, useEffect } from "react";
import { getOrdersBySeller, updateOrderStatus } from "@/actions/order.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Order {
  id: string;
  userId: string;
  sellerId: string;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  items: any[];
  user: any;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrdersBySeller();
        if (res.error) {
          setError(res.error.message || "Something went wrong");
        } else if (res.data) {
          setOrders(res.data);
        }
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    // Optimistic UI update
    const previousOrders = [...orders];
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.error) {
        throw new Error(res.error.message || "Failed to update status");
      }
      if (res.data) {
        toast.success("Order status updated successfully");
      }
      console.log(
        `Order ${orderId} status updated to ${newStatus} successfully`,
      );
    } catch (err: any) {
      // Rollback if API call fails
      setOrders(previousOrders);
      console.error(`Failed to update order ${orderId}:`, err.message);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user?.name || "N/A"}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.paymentMethod.toUpperCase()}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) => handleChangeStatus(order.id, value)}
                  defaultValue={order.status}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PLACED">PLACED</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                    <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                    <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
