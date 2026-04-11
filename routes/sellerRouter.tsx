import { Route } from "@/types";
import { 
  Home, 
  ShoppingBag, 
  LayoutDashboard, 
  BarChart3, 
  Pill, 
  PlusCircle, 
  Hash, 
  ClipboardList, 
  UserCircle 
} from "lucide-react";

export const sellerRoutes: Route[] = [
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
    title: "Inventory",
    items: [
      {
        title: "Manage Medicines",
        url: "/dashboard/medicine/my-medicines",
        icon: Pill,
      },
      {
        title: "Add Medicine",
        url: "/dashboard/medicine/add-medicine",
        icon: PlusCircle,
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
        icon: Hash,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        title: "Orders",
        url: "/dashboard/all-orders",
        icon: ClipboardList,
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
