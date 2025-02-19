"use client";
import {  BadgeHelp, Banknote, ChevronDown, HandCoins,  LayoutDashboard, Settings } from "lucide-react"

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
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = useState(false)
  const [isClick, setIsClicked] = useState(false)

const handleClick = () => {
  setIsVisible(true)
}

const toggleMenu = () => {
  setIsClicked(!isClick);
};

  return (
    <Sidebar className="border-outline-day" >
        <SidebarHeader className="flex justify-center items-center border-b-[1px] mb-5 border-b-outline-day">
            <div className="relative w-40 h-12">
            <Image src="/img/infilogo.png" alt="Logo" className="object-cover" fill />
            </div>
        </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between mb-16 ">
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="flex gap-2">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild  >
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <LayoutDashboard  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <Collapsible open={isOpen}
      onOpenChange={setIsOpen} className="group/collapsible">
                        <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild className="w-full">
                                <button onClick={toggleMenu} className="flex  items-center flex-row gap-4 justify-between w-full">
                                <div className="flex items-center gap-4">
                                <HandCoins  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Savings</span>
                                </div>
                                <ChevronDown className={cn(`transition-transform duration-300 ${
            isClick ? "-rotate-90" : ""
          }`)} />
                                </button>
                            </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild className="w-full flex justify-between items-center">
                                <Link href="/dashboard/savings/thrift" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Thrift Savings</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard/savings/categories" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Structured Savings</span>
                                </Link>
                            </SidebarMenuButton>
                            <hr className="w-full text-outline-day" />
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard/loans" className="flex items-center gap-4">
                                <Banknote  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Loans</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex items-center gap-4">
                                <BadgeHelp className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Support</span>
                                </Link>
                            </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
            <SidebarMenuButton asChild>
                                <Link href="/dashboard/settings" className="flex items-center gap-4">
                                <Settings className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Settings</span>
                                </Link>
                            </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
