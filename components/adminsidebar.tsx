"use client";
import { Banknote, ChevronDown, HandCoins,  Info,  LayoutDashboard, Newspaper, Settings, UsersRoundIcon } from "lucide-react"

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

export function AdminSidebar() {
  const [isvisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isCpen, setIsCpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [isClick, setIsClicked] = useState(false)
  const [isClick1, setIsClicked1] = useState(false)
  const [isClick2, setIsClicked2] = useState(false)


const handleClick = () => {
  setIsVisible(true)
}

const toggleMenu = () => {
  setIsClicked(!isClick);
};

const toggleMen = () => {
  setIsClicked1(!isClick1);
};
const toggleMe = () => {
  setIsClicked2(!isClick2);
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
                                <Link href="/admin/dashboard" className="flex items-center gap-4">
                                <LayoutDashboard  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild  >
                                <Link href="/admin/dashboard/members" className="flex items-center gap-4">
                                <UsersRoundIcon  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Members</span>
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
                                <Link href="/admin/dashboard/savings/thrift" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Thrift Savings</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                            <CollapsibleContent className="border-b-[1px] border-outline-day">
                            <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard/savings/categories" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Categories / Cycles</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible open={isClosed}
      onOpenChange={setIsClosed} className="group/collapsible">
                        <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild className="w-full">
                                <button onClick={toggleMen} className="flex  items-center flex-row gap-4 justify-between w-full">
                                <div className="flex items-center gap-4">
                                <Banknote  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Loans</span>
                                </div>
                                <ChevronDown className={cn(`transition-transform duration-300 ${
            isClick1 ? "-rotate-90" : ""
          }`)} />
                                </button>
                            </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild className="w-full flex justify-between items-center">
                                <Link href="/admin/dashboard/loans/loan-ledger" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Loan Ledger</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                            <CollapsibleContent className="border-b-[1px] border-outline-day">
                            <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard/loans/loan-request" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Loan Requests</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible open={isCpen}
      onOpenChange={setIsCpen} className="group/collapsible">
                        <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild className="w-full">
                                <button onClick={toggleMe} className="flex  items-center flex-row gap-4 justify-between w-full">
                                <div className="flex items-center gap-4">
                                <Newspaper  className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Account</span>
                                </div>
                                <ChevronDown className={cn(`transition-transform duration-300 ${
            isClick2 ? "-rotate-90" : ""
          }`)} />
                                </button>
                            </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <SidebarMenuButton asChild className="w-full flex justify-between items-center">
                                <Link href="/admin/dashboard/account/savings" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Savings Account</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                            <CollapsibleContent className="border-b-[1px] border-outline-day">
                            <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard/account/loans" className="flex items-center gap-4">
                                <span className="text-base font-medium text-content2-day">Loan Account</span>
                                </Link>
                            </SidebarMenuButton>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard/settings" className="flex items-center gap-4">
                                <Info className="size-4 text-content2-day"/>
                                <span className="text-base font-medium text-content2-day">Reports</span>
                                </Link>
                            </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
            <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard/settings" className="flex items-center gap-4">
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
