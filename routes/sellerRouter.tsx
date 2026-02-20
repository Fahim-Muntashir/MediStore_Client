import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard/",
      },
      {
        title: "Home",
        url: "/",
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
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "All Orders",
        url: "/dashboard/all-orders",
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
];
