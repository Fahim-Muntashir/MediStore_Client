import { orderService } from "@/services/order.service";
import { 
  ShoppingBag, 
  MapPin, 
  MessageSquare,
  DollarSign,
  Clock, 
  Package,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueChart, StatusPieChart } from "@/components/modules/dashboard/Charts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function CustomerDashboard() {
  const { data: orders } = await orderService.getOrderByUser();
  const recentOrders = Array.isArray(orders) ? orders.slice(0, 3) : [];

  const stats = [
    { title: "Total Orders", value: orders?.length || 0, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Active Orders", value: orders?.filter((o: any) => o.status !== "DELIVERED" && o.status !== "CANCELLED").length || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Total Spent", value: `$${orders?.reduce((acc: any, o: any) => acc + o.totalPrice, 0).toFixed(2) || "0.00"}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Recent Items", value: orders?.[0]?.items?.length || 0, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">My Health Dashboard</h1>
        <p className="text-muted-foreground">Track your orders and manage your medical profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm spotlight">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-2xl font-black">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/customer/orders" className="gap-2">
                All Orders <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="font-bold">Order ID</TableHead>
                    <TableHead className="font-bold">Item</TableHead>
                    <TableHead className="font-bold">Amount</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order: any) => (
                      <TableRow key={order.id} className="hover:bg-secondary/20 border-b">
                        <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-secondary border shrink-0">
                              {order.items?.[0]?.medicine?.image && (
                                <Image src={order.items[0].medicine.image} alt="" fill className="object-cover" />
                              )}
                            </div>
                            <span className="font-bold text-sm line-clamp-1">
                              {order.items?.[0]?.medicine?.name}
                              {order.items?.length > 1 && ` +${order.items.length - 1} items`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={
                            order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" :
                            order.status === "CANCELLED" ? "bg-destructive/10 text-destructive" :
                            "bg-blue-100 text-blue-700"
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="rounded-xl">Track</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-bold">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">Start your health journey today by placing your first order.</p>
                        <Button asChild className="rounded-xl"><Link href="/shop">Go to Shop</Link></Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Shipping Address</h2>
          <Card className="rounded-2xl border-none shadow-sm overflow-hidden bg-primary text-primary-foreground relative p-8">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Primary Address</h3>
              {recentOrders[0]?.address ? (
                <div className="space-y-1 border-l-2 border-white/20 pl-4">
                  <p className="font-bold">{(recentOrders[0].address as any).name}</p>
                  <p className="text-sm opacity-80">{(recentOrders[0].address as any).street}</p>
                  <p className="text-sm opacity-80">{(recentOrders[0].address as any).city}, {(recentOrders[0].address as any).postalCode}</p>
                </div>
              ) : (
                <p className="text-sm opacity-80 italic">No address on file. Add one during your first checkout.</p>
              )}
              <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90 rounded-xl" asChild>
                <Link href="/dashboard/customer/profile">Manage Profile</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-2xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Spending
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <RevenueChart orders={orders || []} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <StatusPieChart orders={orders || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
