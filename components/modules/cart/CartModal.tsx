"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartModal({ cartData }: any) {
  const router = useRouter();

  const handleOrderNow = () => {
    router.push("/shop/checkout"); // change route if needed
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Cart</span>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {cartData?.items?.length || 0}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {cartData?.items?.length > 0 ? (
            cartData.items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="font-medium">{item.medicine?.name}</span>
                <span className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Cart is empty</p>
          )}
        </div>

        {/* Order Now Button */}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleOrderNow}
            disabled={!cartData?.items?.length}
            className="w-full"
          >
            Check Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
