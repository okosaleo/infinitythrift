import {  Banknote, HandCoins,  LayoutDashboard, PiggyBank, } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Saving",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Loan",
    url: "#",
    icon: Banknote,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-outline-day" >
        <SidebarHeader className="flex justify-center items-center border-b-[1px] mb-5 border-b-outline-day">
            <div className="relative w-40 h-12">
            <Image src="/img/infilogo.png" alt="Logo" className="object-cover" fill />
            </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="flex gap-2">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url} className="flex items-center gap-4">
                                <item.icon  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
