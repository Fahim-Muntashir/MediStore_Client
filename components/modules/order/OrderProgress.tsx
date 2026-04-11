"use client";

import { Check, Clock, Package, Truck, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "PENDING", label: "Pending", icon: Clock },
  { id: "PLACED", label: "Placed", icon: Package },
  { id: "PROCESSING", label: "Processing", icon: Check },
  { id: "SHIPPED", label: "Shipped", icon: Truck },
  { id: "DELIVERED", label: "Delivered", icon: Home },
];

export function OrderProgress({ currentStatus }: { currentStatus: string }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStatus);

  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary -z-10" />
        
        {/* Progress Line */}
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
          style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isActive 
                    ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                    : "bg-background border-secondary text-muted-foreground",
                  isCurrent && "ring-4 ring-primary/20 scale-110"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-tighter transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
