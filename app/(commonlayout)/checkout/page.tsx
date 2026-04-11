"use client";

import { useCart } from "@/app/provider/cartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { placeOrder } from "@/actions/order.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Truck, Package, CreditCard, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cart, refreshCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.medicine.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      address: {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        postalCode: formData.get("postalCode") as string,
      },
      paymentMethod,
    };

    try {
      const { data, error } = await placeOrder(orderData);
      if (error) {
        toast.error(error.message);
      } else if (data?.url) {
        refreshCart();
        window.location.href = data.url;
      } else {
        toast.success("Order placed successfully!");
        refreshCart();
        router.push("/dashboard/customer/orders");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-secondary/30 border-b py-12">
        <div className="container mx-auto px-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-primary font-bold mb-4 hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-black mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order by providing delivery details.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Shipping Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" required className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Street Address</Label>
                  <Input id="street" name="street" placeholder="123 Health Ave, Apt 4B" required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</Label>
                  <Input id="city" name="city" placeholder="New York" required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Postal Code</Label>
                  <Input id="postalCode" name="postalCode" placeholder="10001" required className="h-12 rounded-xl" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-primary" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                <div 
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary/30"}`}
                >
                  <div className={`h-6 w-6 rounded-full border-4 flex items-center justify-center ${paymentMethod === "cod" ? "border-primary" : "border-muted-foreground"}`}>
                    {paymentMethod === "cod" && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Cash on Delivery (COD)</p>
                    <p className="text-sm text-muted-foreground">Pay with cash when your medicine is delivered.</p>
                  </div>
                  <Truck className={`h-6 w-6 ${paymentMethod === "cod" ? "text-primary" : "text-muted-foreground"}`} />
                </div>

                <div 
                  onClick={() => setPaymentMethod("online")}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary/30"}`}
                >
                  <div className={`h-6 w-6 rounded-full border-4 flex items-center justify-center ${paymentMethod === "online" ? "border-primary" : "border-muted-foreground"}`}>
                    {paymentMethod === "online" && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold">Stripe Payment</p>
                      <span className="bg-[#635BFF] text-white text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Powered by Stripe</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pay securely with your credit/debit card.</p>
                  </div>
                  <CreditCard className={`h-6 w-6 ${paymentMethod === "online" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <Card className="rounded-[2.5rem] border-2 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-black mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-secondary/30 shrink-0 border">
                          <Image src={item.medicine.image || "/placeholder-medicine.png"} alt={item.medicine.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{item.medicine.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm">${(item.medicine.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Shipping Fee</span>
                      <span className="text-foreground font-bold">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-4">
                      <span className="text-lg font-bold">Total Amount</span>
                      <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full h-16 rounded-2xl font-black text-lg spotlight shadow-lg group"
                  >
                    {isSubmitting ? "Processing..." : paymentMethod === "online" ? "Pay with Stripe" : "Place Order Now"}
                    {!isSubmitting && (
                      paymentMethod === "online" 
                      ? <CreditCard className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      : <Package className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    )}
                  </Button>

                  <div className="mt-8 pt-8 border-t space-y-4">
                    <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      <span>SECURE TRANSACTION</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      By placing your order, you agree to MediStore's terms of use and privacy policy. 
                      You will receive a confirmation email shortly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
