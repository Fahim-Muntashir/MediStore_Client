import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "My Orders",
        url: "/dashboard/my-orders",
      },
      {
        title: "Order History",
        url: "/dashboard/orders/history",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Help Center",
        url: "/dashboard/help",
      },
      {
        title: "Contact Support",
        url: "/dashboard/support",
      },
    ],
  },
];
