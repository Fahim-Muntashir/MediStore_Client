import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard/dashboard",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
  {
    title: "Medicine Management",
    items: [
      {
        title: "Add Medicine",
        url: "/dashboard/add-medicine",
      },
      {
        title: "My Medicines",
        url: "/dashboard/my-medicines",
      },
      {
        title: "Out of Stock",
        url: "/dashboard/medicines/out-of-stock",
      },
      {
        title: "Medicine History",
        url: "/dashboard/medicines/history",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "All Orders",
        url: "/dashboard/orders",
      },
      {
        title: "Pending Orders",
        url: "/dashboard/orders/pending",
      },
      {
        title: "Completed Orders",
        url: "/dashboard/orders/completed",
      },
      {
        title: "Cancelled Orders",
        url: "/dashboard/orders/cancelled",
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      {
        title: "Stock Management",
        url: "/dashboard/inventory",
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
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
    ],
  },
];
