import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import CreateUser from "./components/Create-User";


export default function UserPage() {
  return (
    <div className="flex flex-col">
      <Dialog>
    <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
       <Link href="/admin/dashboard/settings" ><ArrowLeft className="size-4 text-content-day" /></Link>
       <h1 className="text-2xl font-semi-bold text-content-day">User Management</h1>
  </div>
  <div className="md:w-2/5 w-full border-r-[1px] border-outline-day h-screen">
    <div className="flex justify-between items-center p-3 border-b-[1px] border-outline-day">
      <h1 className="text-xl font-medium">Roles</h1>
      <DialogTrigger>
      <button className='p-2 flex items-center bg-primary-active gap-2 rounded-md'>
           <Plus className='size-4 text-text-button' />
           <p className='text-sm text-text-button'>Add New Role</p>
        </button>
        </DialogTrigger>
    </div>
    <div className=" flex justify-between items-center p-3 border-b-[1px] border-outline-day">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Super Admin(1)</h2>
        <p className="text-[#8E95A2] text-sm">You</p>
      </div>
      <div>
        <ChevronRight className="text-icon-day" />
      </div>
    </div>
    <Link href='/admin/dashboard/settings/userman/roles' className=" flex justify-between items-center p-3 border-b-[1px] border-outline-day">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Admin(0)</h2>
        <p className="text-[#8E95A2] text-sm">No User</p>
      </div>
      <div>
        <ChevronRight className="text-icon-day" />
      </div>
    </Link>
  </div>
  <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>
          <CreateUser />
      </DialogContent>
  </Dialog>
  </div>
  )
}
