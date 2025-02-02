import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search } from "lucide-react";
import Link from "next/link";


export default function Rolespage() {
  return (
    <div className="flex flex-col ">
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
            <Link href="/admin/dashboard/settings/userman" ><ArrowLeft className="size-4 text-content-day" /></Link>
            <h1 className="text-2xl font-semi-bold text-content-day">User Management</h1>
       </div>
       <div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
            <h1 className="text-base font-semi-bold text-content-day font-regular">Settings/ User Management/ Roles</h1>
       </div>
       <div className="md:w-2/5 w-full border-r-[1px] border-outline-day h-screen">
          <div className="flex justify-between items-center p-3 border-b-[1px] border-outline-day">
              <h1 className="text-xl font-medium">Admin</h1>
          </div>
          <div className="px-3">
            <div className="rounded-md flex gap-3 mt-2 p-2">
            <button>
               <Search className="size-6 text-icon-day" />
            </button>
            <Input className="bg-[#8e95a252] border-0" />
            </div>
       </div> 
       <div className="flex items-center justify-end p-3">
        <button className="text-[#ba9007] flex items-center gap-1 text-sm bg-[#8e95a252] py-1 px-3 rounded-xl">
            <Plus className="size-4 text-[#ba9007]" />
           <p className="text-[12px]">Create new User</p>
            </button>
        </div>   
    </div>
</div>
  )
}
