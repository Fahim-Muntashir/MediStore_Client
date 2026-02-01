import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Using a constant with an arrow function
export const CartButton = ({ cartData }: { cartData: any }) => {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Cart</span>
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        {cartData?.items?.length}
      </span>
    </Button>
  );
};
