import { Footer2 } from "@/components/layout/footer2";
import { Navbar5 } from "@/components/layout/navbar5";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar5 />
      {children}
      <Footer2></Footer2>
    </div>
  );
}
