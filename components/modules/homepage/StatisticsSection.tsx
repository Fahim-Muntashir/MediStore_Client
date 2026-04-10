"use client";

import { motion } from "framer-motion";
import { Users, ShoppingBag, Truck, ThumbsUp } from "lucide-react";

const stats = [
  { id: 1, name: "Happy Customers", value: "50K+", icon: Users, color: "bg-blue-500/10 text-blue-500" },
  { id: 2, name: "Available Medicines", value: "2K+", icon: ShoppingBag, color: "bg-green-500/10 text-green-500" },
  { id: 3, name: "Orders Delivered", value: "100K+", icon: Truck, color: "bg-purple-500/10 text-purple-500" },
  { id: 4, name: "Positive Reviews", value: "15K+", icon: ThumbsUp, color: "bg-orange-500/10 text-orange-500" },
];

export function StatisticsSection() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-4 rounded-xl ${stat.color} mb-4`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-muted-foreground font-medium">{stat.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
