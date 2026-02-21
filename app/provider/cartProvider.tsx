// app/provider/cartProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { fetchCartItems } from "@/actions/medicine.actions";

interface CartContextType {
  cartData: any;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<any>(null);

  const refreshCart = async () => {
    const res = await fetchCartItems();
    if (res.success) {
      setCartData(res.data);
    } else {
      setCartData(null);
    }
  };

  return (
    <CartContext.Provider value={{ cartData, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
