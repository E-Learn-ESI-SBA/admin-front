import NavBar from "@/components/layouts/navbar";
import { SideBar } from "@/components/layouts/sidebar";
import { sideBarItems } from "@/static/content/layouts";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex">
      <SideBar role="teacher" sideBarItems={sideBarItems} />
      <div className="flex-1 flex-col  h-full ">
          <NavBar title="hello"/>
          <div className="p-6">
          {children}
          </div>
      </div>
    </div>
  );
}
