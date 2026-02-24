"use client";

import { fetchCartItems } from "@/actions/medicine.actions";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    const { data } = await fetchCartItems();
    setCart(data);
    setLoading(false);
  };

  const clearCart = () => {
    setCart(null);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        refreshCart: fetchCart,
        clearCart, // ✅ expose this
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
