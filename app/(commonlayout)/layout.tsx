import { Footer2 } from "@/components/layout/footer2";
import { Header } from "@/components/layout/header";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer2></Footer2>
    </div>
  );
}
