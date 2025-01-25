import { Bell, Mail } from "lucide-react";
import { UserNav } from "./UserNav";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";


async function getData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });

  return user;
}

export default async function Navbar() {
  
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if(!session) {
    throw new Error("Unauthorized")
  }

  const data = await getData(session?.user.id);
  return (
    <nav className=" flex justify-between items-center">
        <div className=" relative flex justify-between gap-10 pr-10 items-center flex-row">
          <div className="h-10 w-10  rounded-full bg-outline-day flex items-center justify-center hover:bg-active-nav"><Mail className="text-content-day size-4" /></div>
          <div className="h-10 w-10 rounded-full bg-outline-day flex items-center justify-center hover:bg-active-nav"><Bell className="text-content-day size-4" /></div>
          <div className="h-10 w-10 rounded-full bg-outline-day flex items-center justify-center hover:bg-active-nav">
            <UserNav refid={data?.id.slice(0, 8)} name={data?.name}   />
          </div>

        </div>
    </nav>
  )
}
