import { getAllOrders } from "@/actions/admin.action";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Phone, CreditCard, Truck } from "lucide-react";

// Types
type Address = {
  name: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
};

type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type Order = {
  id: string;
  userId: string;
  user: User;
  totalPrice: number;
  address: Address;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | string;
  paymentMethod: "cod" | "online";
  items: Item[];
};

const Page = async () => {
  const res = await getAllOrders();
  const orders: Order[] = res.data || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "COMPLETED":
        return "default";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            All Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No orders found.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Orders will appear here once customers place them.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 border-b py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-base font-medium">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        User: {order.user.name} ({order.user.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                      <span className="text-lg font-semibold text-foreground">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Order Items */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Items
                      </h3>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {item.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery & Payment Info */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Delivery Address
                        </h3>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">
                                {order.address.name}
                              </p>
                              <p className="text-muted-foreground">
                                {order.address.street}
                              </p>
                              <p className="text-muted-foreground">
                                {order.address.city}, {order.address.postalCode}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {order.address.phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        {order.paymentMethod === "online" ? (
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Truck className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-muted-foreground">
                          Payment:{" "}
                          <span className="font-medium text-foreground">
                            {order.paymentMethod === "online"
                              ? "Online Payment"
                              : "Cash on Delivery"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
