"use client";

import { Pill, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { fetchCartItems } from "@/actions/medicine.actions";
import CartModal from "../modules/cart/CartModal";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "#" },
  { name: "Offers", href: "#" },
  { name: "Contact", href: "#" },
];

export function Header({ data }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log(data);
  const userInfo = data?.user;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cartData, setCartData] = useState<any>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      setLoadingCart(true);
      const res = await fetchCartItems(); // async call
      if (res.success) {
        setCartData(res.data);
      } else {
        setCartError(res.error?.message || "Failed to fetch cart");
      }
      setLoadingCart(false);
    };

    loadCart();
  }, []);

  console.log(cartData, "hello cart Data");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediStore</span>
          </Link>

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
                <Button variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
                <Button>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : (
              <>
                {/* Account Button with Hover Dropdown */}
                <div
                  className="relative  sm:flex"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-[-10] mt-6 w-48 rounded-md bg-white shadow-lg z-10">
                      <div className="py-2">
                        <span className="block px-4 py-2 text-sm text-gray-700">
                          Hi, Fahim
                        </span>
                        <a
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </a>{" "}
                        <a
                          href="/dashboard/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                      </div>
                      {/* Logout Button */}
                      <button
                        onClick={async () => {
                          try {
                            // Sign the user out
                            await authClient.signOut();

                            // Redirect to home page after logout
                            window.location.href = "/";
                          } catch (err) {
                            console.error("Logout failed:", err);
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm font-bold text-red-600 cursor-pointer hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                {/* Cart Button */}
                <CartModal cartData={cartData} />
              </>
            )}
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
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
