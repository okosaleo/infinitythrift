import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function FApage() {
  return (
    <div className="w-full flex flex-col">
       <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
           <Link href="/dashboard/settings/authen" ><ArrowLeft className="size-4 text-content-day" /></Link>
               <h1 className="text-2xl font-semi-bold text-content-day">Authentication</h1>
       </div>
      <div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
           <h1 className="text-sm font-semi-bold text-content-day ml-3">Settings / Authentication / 2FA methods</h1>
    </div>
    {/* MAIN */}
    <div className="w-full">
      <div className="w-full flex  max-w-[1290px] flex-col gap-9 p-8">
        <div className="text-xl font-semibold text-content-day">
          <h2>2FA Methods</h2>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-content-day font-medium">SMS OTP</p>
            <p className="text-[13px] text-content-day">Receive a one-time password via SMS on your registered phone number</p>
          </div>
          <div className="flex gap-4 items-center">
            <Switch />
            <button className="bg-[#f7f8f8] text-primary-active rounded-2xl p-3 text-sm"> Change Number </button>
          </div>
        </div>
        <div className="flex items-center gap-10">
        <div className="flex flex-col gap-2">
            <p className="text-content-day font-medium">Email OTP</p>
            <p className="text-[13px] text-content-day">A one-time password will be sent to your email.</p>
          </div>
          <div className="flex items-center">
          <Switch />
          </div>
        </div>
       
      </div>
    </div>
</div>
  )
}
