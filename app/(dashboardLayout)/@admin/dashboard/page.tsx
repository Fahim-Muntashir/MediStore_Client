import { adminService } from "@/services/admin.service";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { RevenueChart, StatusPieChart } from "@/components/modules/dashboard/Charts";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const { data: stats } = await adminService.getDashboardStats();

  const cards = [
    { title: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Orders", value: stats?.totalOrders || 0, icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Total Revenue", value: `$${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Pending Orders", value: stats?.orders?.filter((o: any) => o.status === "PENDING").length || 0, icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const recentOrders = stats?.orders?.slice(0, 5) || [];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
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
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <RevenueChart orders={stats?.orders || []} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <StatusPieChart orders={stats?.orders || []} />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Orders</CardTitle>
          <Badge variant="outline" className="rounded-full">View All</Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="font-bold">Order ID</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Amount</TableHead>
                <TableHead className="font-bold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order: any) => (
                  <TableRow key={order.id} className="hover:bg-secondary/20 border-b">
                    <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell className="font-bold">{order.user?.name || "Anonymous"}</TableCell>
                    <TableCell>
                      <Badge className={
                        order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" :
                          order.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                            "bg-blue-100 text-blue-700"
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No orders found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
