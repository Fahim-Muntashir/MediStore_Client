"use client";

import React from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export const RevenueChart = ({ orders = [] }: { orders?: any[] }) => {
    // Calculate dynamic data based on orders
    const revenueByMonth = orders.reduce((acc: any, order: any) => {
      const date = new Date(order.createdAt || new Date());
      const month = date.toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + (order.totalPrice || 0);
      return acc;
    }, {});

    const chartData = Object.keys(revenueByMonth).map(month => ({
      name: month,
      revenue: revenueByMonth[month]
    }));

    // Fallback if no data
    const finalData = chartData.length > 0 ? chartData : [{ name: "Current", revenue: 0 }];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={finalData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#888" }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#888" }} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="var(--primary)" 
            strokeWidth={4} 
            dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

export const StatusPieChart = ({ orders = [] }: { orders?: any[] }) => {
    const statusCounts = orders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const pieData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };
