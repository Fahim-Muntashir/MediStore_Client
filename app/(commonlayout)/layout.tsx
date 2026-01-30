import { Footer2 } from "@/components/layout/footer2";
import { Header } from "@/components/layout/header";
import { userService } from "@/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  return (
    <div>
      <Header data={data?.user}></Header>
      {children}
      <Footer2></Footer2>
    </div>
  );
}
