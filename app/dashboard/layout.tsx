import { SideBar } from "@/components/layouts/sidebar";
import { sideBarItems } from "@/data/side-bar-items";
import Header from "@/components/layouts/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex">
      <SideBar  sideBarItems={sideBarItems} />
      <div className="flex-1 flex-col  h-full ">
          <Header />
          <div className="p-6">
          {children}
          </div>
      </div>
    </div>
  );
}
