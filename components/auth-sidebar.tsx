"use client";
import { ChevronRight,  } from "lucide-react"

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
const linknavs = [
  {
      id: 1,
      title: "Password Setting",
      desc: "Manage Password",
      url: "/dashboard/settings/authen/password",

  },
  {
      id: 2,
      title: "2FA Methods",
      desc: "SMS OTP, Email OTP",
      url: "/dashboard/settings/kyc",

  },
  {
      id: 3,
      title: "Pin Setting",
      desc: "Manage Pin",
      url: "/dashboard/settings/authen/password",

  },
]


export function AuthSidebar() {

  return (
    <Sidebar className="border-outline-day" >
      <SidebarContent className="flex flex-col justify-between mb-16 ">
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="flex gap-2">
                {linknavs.map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton asChild  >
                  <Link href={item.url}  className="flex items-center justify-between w-full h-16  p-1 rounded-md">
                      <div className="flex flex-row">
                     <div className="ml-4 flex flex-col items-start justify-start gap-3">
                         <h2 className="text-xl text-content-day font-semibold">{item.title}</h2>
                         <p className="text-content-day font-light text-sm">{item.desc}</p>
                     </div>
                 </div>
                 <div>
                     <ChevronRight className='text-content-day size-6' />
                 </div>
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
