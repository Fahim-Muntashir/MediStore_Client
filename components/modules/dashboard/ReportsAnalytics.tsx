"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Mon", sales: 4000, revenue: 2400 },
  { name: "Tue", sales: 3000, revenue: 1398 },
  { name: "Wed", sales: 2000, revenue: 9800 },
  { name: "Thu", sales: 2780, revenue: 3908 },
  { name: "Fri", sales: 1890, revenue: 4800 },
  { name: "Sat", sales: 2390, revenue: 3800 },
  { name: "Sun", sales: 3490, revenue: 4300 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export const ReportsAnalytics = ({ role = "admin" }: { role?: "admin" | "seller" }) => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into {role === "admin" ? "platform" : "your shop"} performance.</p>
        </div>
        <Button className="gap-2 rounded-xl h-12 shadow-lg">
          <Download className="h-5 w-5" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-sm bg-primary text-primary-foreground relative overflow-hidden">
          <CardContent className="p-8">
            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-80 uppercase font-black tracking-widest">Growth Rate</p>
                <h3 className="text-4xl font-black">+24.5%</h3>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold bg-white/10 w-fit px-3 py-1 rounded-full">
                <ArrowUpRight className="h-4 w-4" />
                Since last month
              </div>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm bg-secondary/50 p-8 flex flex-col justify-center">
          <p className="text-sm text-muted-foreground uppercase font-black tracking-widest mb-2">Average Order Value</p>
          <h3 className="text-4xl font-black">$124.50</h3>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-4">
            <TrendingUp className="h-4 w-4" />
            12% increase per order
          </div>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm bg-secondary/50 p-8 flex flex-col justify-center">
          <p className="text-sm text-muted-foreground uppercase font-black tracking-widest mb-2">Return Customer Rate</p>
          <h3 className="text-4xl font-black">42.8%</h3>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-4">
            <TrendingUp className="h-4 w-4" />
            Stable loyalty performance
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue vs Sales Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="transparent" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
