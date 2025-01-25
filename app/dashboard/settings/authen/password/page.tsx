import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function page() {
  return (
    <div className="w-full flex flex-col">
          <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
<Link href="/dashboard/settings/authen" ><ArrowLeft className="size-4 text-content-day" /></Link>
<h1 className="text-2xl font-semi-bold text-content-day">Authentication</h1>
</div>
<div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
<h1 className="text-sm font-semi-bold text-content-day ml-3">Settings / Authentication / Password Setting</h1>
</div>


     <div className="w-full p-6">
      <div className="bg-[#f7f8f8] flex-col flex h-[35vh] p-7 gap-12">
        <div className="w-full flex items-start justify-center flex-col gap-2">
          <p className="text-xl font-medium">Password Setting</p>
          <p className="text-[12px]">Change password</p>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-20 gap-3">
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Password</Label>
            <Input type="password" className="w-64"/>
          </div>
          <Button className="mt-5">Change Password</Button>
        </div>
        <div>
          <p className="text-[13px]">Last Updated: 07/05/2024 at 5:00PM</p>
        </div>
      </div>
     </div>
    </div>
  )
}
