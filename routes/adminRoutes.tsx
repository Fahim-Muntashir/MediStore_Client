import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/dashboard/all-users",
      },
      {
        title: "All Orders",
        url: "/dashboard/all-orders",
      },
    ],
  },
];
