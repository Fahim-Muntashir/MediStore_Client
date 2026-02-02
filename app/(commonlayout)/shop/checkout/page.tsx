"use client";

import { fetchCartItems, placeOrder } from "@/actions/medicine.actions";
import React, { useState, useEffect, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const loadCart = async () => {
      const res = await fetchCartItems();
      if (res.success && res.data?.items) {
        setCartItems(res.data.items);
        const total = res.data.items.reduce(
          (sum: number, item: any) => sum + item.quantity * item.medicine.price,
          0,
        );
        setTotalPrice(total);
      } else {
        console.error(res.error?.message);
      }
    };
    loadCart();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Build the address object
    const address = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
    };

    // Get payment method
    const paymentMethod = formData.get("paymentMethod") as "cod" | "online";

    // Construct the final order object
    const orderData = {
      items: cartItems, // cartItems from state
      address,
      paymentMethod,
      totalPrice, // optional, can include
    };

    console.log("Order Data:", orderData);

    try {
      const res = await placeOrder(orderData);
      console.log(res);
      if (res.success) {
        router.refresh();
        router.push("/");
      }
      console.log("Order Response:", res);
      // Show success message or redirect
    } catch (err) {
      console.error("Place order failed:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Address Form */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="text" name="name" placeholder="Full Name" required />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
              />
              <Input
                type="text"
                name="street"
                placeholder="Street Address"
                required
              />
              <Input type="text" name="city" placeholder="City" required />
              <Input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  defaultChecked
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  disabled
                />
                Online Payment (Coming Soon)
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.medicine.image}
                      alt={item.medicine.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.medicine.name}</h3>
                      <p>Price: ${item.medicine.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Subtotal: ${item.quantity * item.medicine.price}</p>
                    </div>
                  </div>
                ))}
                <h2 className="text-2xl font-bold mt-4">
                  Total: ${totalPrice}
                </h2>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <Button type="submit" className="w-full py-3 text-lg">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Page;
