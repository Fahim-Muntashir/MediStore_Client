import { sellerService } from "@/services/seller.service";
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  BarChart3,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevenueChart, StatusPieChart } from "@/components/modules/dashboard/Charts";
import Link from "next/link";

export default async function SellerDashboard() {
  const { data: stats } = await sellerService.getDashboardStats();

  const cards = [
    { title: "Your Medicines", value: stats?.orders?.reduce((acc: any, o: any) => acc + o.items.length, 0) || 0, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Orders", value: stats?.totalOrders || 0, icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Total Earnings", value: `$${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Active Stock", value: "84%", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const recentOrders = stats?.orders?.slice(0, 5) || [];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-2">Seller Hub</h1>
          <p className="text-muted-foreground">Manage your pharmacy business and track sales.</p>
        </div>
        <Button asChild className="rounded-xl h-12 px-6 gap-2">
          <Link href="/dashboard/medicine/add-medicine">
            <Plus className="h-5 w-5" />
            Add New Medicine
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm spotlight">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{card.title}</p>
                  <h3 className="text-2xl font-black">{card.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-2xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <RevenueChart orders={stats?.orders || []} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <StatusPieChart orders={stats?.orders || []} />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Customer Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/all-orders">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="font-bold">Order ID</TableHead>
                <TableHead className="font-bold">Items</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Total</TableHead>
                <TableHead className="font-bold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order: any) => (
                  <TableRow key={order.id} className="hover:bg-secondary/20 border-b">
                    <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      <span className="font-medium text-sm">
                        {order.items?.[0]?.medicine?.name}
                        {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" :
                        order.status === "CANCELLED" ? "bg-destructive/10 text-destructive" :
                        "bg-blue-100 text-blue-700"
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No orders received yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
