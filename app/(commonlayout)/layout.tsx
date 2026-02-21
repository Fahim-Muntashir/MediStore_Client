// app/(commonlayout)/layout.tsx
import { Footer2 } from "@/components/layout/footer2";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/app/provider/cartProvider";
import { userService } from "@/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  return (
    <CartProvider>
      <Header data={data?.user} />
      {children}
      <Footer2 />
    </CartProvider>
  );
}
