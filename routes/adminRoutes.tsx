import { Route } from "@/types";
import { 
  Home, 
  ShoppingBag, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Pill, 
  ClipboardList, 
  Hash, 
  UserCircle 
} from "lucide-react";

export const adminRoutes: Route[] = [
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
    title: "Main",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "All Users",
        url: "/dashboard/all-users",
        icon: Users,
      },
      {
        title: "All Medicines",
        url: "/dashboard/all-medicines",
        icon: Pill,
      },
      {
        title: "All Orders",
        url: "/dashboard/all-orders",
        icon: ClipboardList,
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
        icon: Hash,
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
