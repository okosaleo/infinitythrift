
import { Bell, Mail } from "lucide-react";
import { UserNav } from "./UserNav";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";



export default function Navbar() {


  return (
    <nav className=" flex justify-between items-center">
        <div className=" relative flex justify-between gap-10 pr-10 items-center flex-row">
          <div className="h-10 w-10  rounded-full bg-outline-day flex items-center justify-center hover:bg-active-nav"><Mail className="text-content-day size-4" /></div>
          <div className="h-10 w-10 rounded-full bg-outline-day flex items-center justify-center hover:bg-active-nav"><Bell className="text-content-day size-4" /></div>
          <div className="h-10 w-10 rounded-full bg-outline-day flex items-center justify-center hover:bg-active-nav">
            <UserNav refid="leo" name="Leo"  />
          </div>

        </div>
    </nav>
  )
}
