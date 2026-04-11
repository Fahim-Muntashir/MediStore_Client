"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (success === "true") {
      toast.success("Payment Received!", {
        description: "Your order has been confirmed and is being processed.",
        duration: 5000,
      });
      // Clean up URL without refreshing
      window.history.replaceState({}, "", "/dashboard/my-orders");
    }
    if (canceled === "true") {
      toast.error("Payment Canceled", {
        description: "Your transaction was not completed. You can try again from checkout.",
        duration: 5000,
      });
      window.history.replaceState({}, "", "/checkout");
    }
  }, [success, canceled]);

  return null;
}
