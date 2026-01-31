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
        title: "Analytics",
        url: "/dashboard/analytics",
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
      {
        title: "Settings",
        url: "/dashboard/settings",
      },
      {
        title: "Security",
        url: "/dashboard/security",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "My Orders",
        url: "/dashboard/orders",
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
