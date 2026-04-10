"use client";

import { Pill, Menu, X, User, Search, ShoppingCart, ChevronDown, Package, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import CartModal from "../modules/cart/CartModal";
import { useCart } from "@/app/provider/cartProvider";
import { Input } from "@/components/ui/input";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/#categories" },
  { name: "Orders", href: "/dashboard/customer/orders" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { 
    title: "Personal Care", 
    href: "/shop?category=personal-care",
    description: "Skincare, haircare, and daily hygiene essentials.",
    icon: User
  },
  { 
    title: "Vitamins & Supplements", 
    href: "/shop?category=vitamins",
    description: "Boost your immunity and overall wellness.",
    icon: Pill
  },
  { 
    title: "Baby Care", 
    href: "/shop?category=baby-care",
    description: "Safe and gentle products for your little ones.",
    icon: Package
  },
  { 
    title: "First Aid", 
    href: "/shop?category=first-aid",
    description: "Essential medical supplies for emergencies.",
    icon: ShieldCheck
  },
];

export function Header({ data }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { cart, loading } = useCart();

  const totalItems =
    cart?.items?.reduce(
      (total: number, item: any) => total + item.quantity,
      0,
    ) || 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b py-3 transition-none">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary transition-transform group-hover:scale-110">
              <Pill className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground hidden sm:block">
              MediStore
            </span>
          </Link>

          {/* Search Bar - Hidden on small mobile */}
          <div className="hidden lg:flex relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search medicines, health products..." 
              className="pl-10 h-10 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <ListItem
                          key={category.title}
                          title={category.title}
                          href={category.href}
                          icon={<category.icon className="h-4 w-4 mr-2 text-primary" />}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={link.href}>
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {!data ? (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full px-6">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-secondary/50"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    {data.user?.image ? (
                      <img
                        src={data.user.image}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-0"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-card p-2 shadow-xl ring-1 ring-black/5 spotlight animate-in fade-in zoom-in duration-200 z-[100]">
                        <div className="px-3 py-2 mb-2 border-b">
                          <p className="text-sm font-semibold">
                            {data.user?.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {data.user?.email}
                          </p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Package className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={async () => {
                            await authClient.signOut();
                            window.location.href = "/";
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-destructive rounded-lg hover:bg-destructive/10 transition-colors mt-1"
                        >
                          <X className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <CartModal
              cartData={cart}
              totalItems={totalItems}
              loading={loading}
            />

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-background border-t z-50 animate-in slide-in-from-top duration-300 overflow-y-auto pb-20">
          <nav className="flex flex-col p-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search medicines..." className="pl-10 h-10 bg-secondary/50 border-none" />
            </div>

            <div className="space-y-6">
              {/* Category Section in Mobile */}
              <div>
                <h3 className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Shop by Category
                </h3>
                <div className="grid grid-cols-1 gap-1">
                  {categories.map((category) => (
                    <Link
                      key={category.title}
                      href={category.href}
                      className="flex items-center gap-3 p-3 text-base font-medium rounded-xl hover:bg-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <category.icon className="h-4 w-4" />
                      </div>
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Menu
                </h3>
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.filter(link => link.name !== "Categories").map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center justify-between p-3 text-base font-medium rounded-xl hover:bg-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {!data && (
              <div className="grid grid-cols-1 gap-3 mt-8">
                <Button variant="outline" asChild className="h-12 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="h-12 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

const ListItem = (({ className, title, children, icon, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
