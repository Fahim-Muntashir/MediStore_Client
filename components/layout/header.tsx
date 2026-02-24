"use client";

import { Pill, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import CartModal from "../modules/cart/CartModal";
import { useCart } from "@/app/provider/cartProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "#" },
  { name: "Offers", href: "#" },
  { name: "Contact", href: "#" },
];

export function Header({ data }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { cart, loading } = useCart();

  // ✅ calculate total quantity safely
  const totalItems =
    cart?.items?.reduce(
      (total: number, item: any) => total + item.quantity,
      0,
    ) || 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediStore</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!data ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : (
              <>
                {/* Account Dropdown */}
                <div
                  className="relative sm:flex"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-6 w-48 rounded-md bg-white shadow-lg z-10">
                      <div className="py-2">
                        <span className="block px-4 py-2 text-sm text-gray-700">
                          Hi, {data?.user?.name || "User"}
                        </span>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await authClient.signOut();
                            window.location.href = "/";
                          } catch (err) {
                            console.error("Logout failed:", err);
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* ✅ Cart Modal with context */}
                <CartModal
                  cartData={cart}
                  totalItems={totalItems}
                  loading={loading}
                />
              </>
            )}

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
