import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin",
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
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
      {
        title: "Sellers",
        url: "/admin/users/sellers",
      },
      {
        title: "Admins",
        url: "/admin/users/admins",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Products",
        url: "/admin/products",
      },
      {
        title: "Categories",
        url: "/admin/categories",
      },
      {
        title: "Orders",
        url: "/admin/orders",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
      },
      {
        title: "Roles & Permissions",
        url: "/admin/roles",
      },
      {
        title: "Logs",
        url: "/admin/logs",
      },
    ],
  },
];
