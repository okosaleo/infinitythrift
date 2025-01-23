import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function Profilepage() {
  return (
    <div className="flex flex-col gap-2">
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
            <Link href="/dashboard/settings" ><ArrowLeft className="size-4 text-content-day" /></Link>
            <h1 className="text-2xl font-semi-bold text-content-day">Profile</h1>
       </div>
       <div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
            <h1 className="text-base font-semi-bold text-content-day font-light">Settings/profile</h1>
       </div>

       <div className="w-full p-7">

       </div>
    </div>
  )
}
