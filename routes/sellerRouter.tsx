import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/seller",
      },
      {
        title: "Analytics",
        url: "/seller/analytics",
      },
    ],
  },
  {
    title: "Blog Management",
    items: [
      {
        title: "Create Blog",
        url: "/seller/blog/create",
      },
      {
        title: "My Blogs",
        url: "/seller/blogs",
      },
      {
        title: "Drafts",
        url: "/seller/blogs/drafts",
      },
      {
        title: "History",
        url: "/seller/blogs/history",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Comments",
        url: "/seller/comments",
      },
      {
        title: "Categories",
        url: "/seller/categories",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/seller/profile",
      },
      {
        title: "Settings",
        url: "/seller/settings",
      },
    ],
  },
];
