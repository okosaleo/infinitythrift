"use client";
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
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible"
import { CollapsibleContent } from "@radix-ui/react-collapsible"
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Thrift Savings",
    url: "/dashboard",
  },
  {
    title: "Categories / Cycles",
    url: "/dashboard",
  },
  {
    title: "Structured Savings",
    url: "#",
  },
]

export function AppSidebar() {
  const [isvisible, setIsVisible] = useState(false)

const handleClick = () => {
  setIsVisible(true)
}

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
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <LayoutDashboard  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <HandCoins  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Savings</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild className="w-full flex justify-between items-center">
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Thrift Savings</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Categories / Cycles</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Structured Savings</span>
                                </Link>
                            </SidebarMenuButton>
                            <hr className="w-full text-outline-day" />
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
