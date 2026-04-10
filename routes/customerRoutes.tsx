import { Route } from "@/types";
import { 
  Home, 
  ShoppingBag, 
  LayoutDashboard, 
  Package, 
  Star, 
  UserCircle 
} from "lucide-react";

export const customerRoutes: Route[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Browse Medicine",
        url: "/shop",
        icon: ShoppingBag,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Orders",
        url: "/dashboard/my-orders",
        icon: Package,
      },
      {
        title: "My Reviews",
        url: "/dashboard/reviews",
        icon: Star,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];
