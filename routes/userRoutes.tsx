import { Route } from "@/types";
import { Home, ShoppingBag, FileText, History } from "lucide-react";

export const userRoutes: Route[] = [
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
    title: "Blog Management",
    items: [
      {
        title: "Create Blog",
        url: "/dashboard/create-blog",
        icon: FileText,
      },
      {
        title: "History",
        url: "/dashboard/history",
        icon: History,
      },
    ],
  },
];
