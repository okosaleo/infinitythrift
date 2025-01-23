import { Button } from "@/components/ui/button";
import { ArrowLeft, ScrollText } from "lucide-react";
import Link from "next/link";


export default function page() {
  return (
    <div className="flex flex-col gap-2">
    <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
     <Link href="/dashboard/settings" ><ArrowLeft className="size-4 text-content-day" /></Link>
       <h1 className="text-2xl font-semi-bold text-content-day">Settings</h1>
      </div><div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
       <h1 className="text-sm font-semi-bold text-content-day ml-3">Settings / KYC /</h1>
      </div>

      <div className="w-full flex items-center justify-center h-[70vh] flex-col gap-2 p-5">
        <div className="h-14 w-14 rounded-full bg-[#f7f8f8] flex items-center justify-center">
            <ScrollText className="size-5 text-content-day" />
        </div>
        <div>
            <p className="md:text-base text-[13px] w-full">Complete your KYC verification to have full access.</p>
        </div>
        <div>
            <Button>Complete KYC</Button>
        </div>
      </div>
  </div>
  )
}
