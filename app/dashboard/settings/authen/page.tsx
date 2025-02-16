import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
      url: "/dashboard/settings/authen/2FA",

  },
]


export default function SettingsPage() {
  return (
    <div>
    <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
<Link href="/dashboard/settings" ><ArrowLeft className="size-4 text-content-day" /></Link>
<h1 className="text-2xl font-semi-bold text-content-day">Authentication</h1>
</div>
<div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
<h1 className="text-sm font-semi-bold text-content-day ml-3">Settings / Authentication</h1>
</div>
<main className="w-full flex">
<div className="md:w-1/3 w-full border-r-[1px] border-outline-day h-screen">
{linknavs.map((item) => (
   <div key={item.id} className="w-full p-4 hover:bg-active-nav border-b-[1px] border-dashed border-outline-day">
        <Link href={item.url} className="flex items-center justify-between w-full h-16  p-1 rounded-md">
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
</div>
))}
</div>
</main>   
</div>
  )
}
