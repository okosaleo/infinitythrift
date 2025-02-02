import { ChevronRight, CircleUserRound, GitFork, LayoutDashboard, Settings, UserRound } from "lucide-react";
import Link from "next/link";

const linknavs = [
    {
        id: 1,
        title: "Profile",
        desc: "Add and edit your personal profile",
        url: "/admin/dashboard/settings/profile",
        icon: UserRound,
    },
    {
        id: 2,
        title: "User Management",
        desc: "Roles",
        url: "/admin/dashboard/settings/userman",
        icon: GitFork,
    },
    {
        id: 3,
        title: "Permission",
        desc: "Manage Permission",
        url: "/admin/dashboard/settings/authen",
        icon: CircleUserRound,
    },
    {
        id: 4,
        title: "Modules Settings",
        desc: "Notification,Savings,Loan,Members",
        url: "/admin/dashboard/settings/modules",
        icon: LayoutDashboard,
    }
]
export default function SettingsPage() {
  return (
    <div >
        <div className="p-4 border-b-[1px] border-outline-day w-full">
            <h1 className="text-2xl text-content-day font-semibold">Settings</h1>
        </div>
        <div className="lg:w-1/2 w-full border-r-[1px] border-outline-day h-screen">
        {linknavs.map((item) => (
             <div key={item.id} className="w-full p-4 hover:bg-active-nav border-b-[1px] border-dashed border-outline-day">
                  <Link href={item.url} className="flex items-center justify-between w-full h-16  p-1 rounded-md">
                      <div className="flex flex-row">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-light-overlay">
                           <item.icon className='text-content-day size-6'  />
                     </div>
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
    </div>
  )
}
