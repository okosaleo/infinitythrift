import Navbar from "@/components/adminnav/dashNav";
import { AdminSidebar } from "@/components/adminsidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function DashLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <SidebarProvider>
          <AdminSidebar />
        <main className="w-full">
          <div className="flex items-center flex-row justify-between p-3 w-full border-b-[1px] border-b-outline-day">
          <SidebarTrigger />
          <Navbar />
          </div>
        {children}
      </main>
        </SidebarProvider>
        </>
    )
  }