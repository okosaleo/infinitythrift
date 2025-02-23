import { auth } from "@/auth";
import { Dialog } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Ban, ChartNetwork, ChevronRight, CircleCheck, CircleX, Clock, EllipsisVertical, UserPen } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
        id: userId,
    },
    include: {
        kyc: true,
    }
  });

  return data
};


export default async function Profilepage() {
    const session = await auth.api.getSession({
          headers: await headers()
        })
        
        if(!session || session === null) {
          redirect("/sign-in");
        }
    
        const userId = session.user.id
      
        const data = await getData(userId);
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
        <div className="w-full p-7 bg-[#f7f8f8] flex flex-col gap-10 lg:h-[60vh] h-fit rounded-sm">
        {/* first part*/}
        <div className="flex flex-row items-start">
          <div className="flex md:flex-row flex-col md:justify-center md:items-end items-center gap-5 w-[98%]">
              <div className="flex flex-col gap-4 items-center justify-center">
                  <div className="w-20 h-20 bg-primary-nav rounded-full"></div>
                  <div className="flex gap-5 items-center justify-center">
                    <p className="text-xl font-medium">{data?.name}</p>
                   </div>
               </div>
               {data?.kyc?.kycstatus === "APPROVED" ? (
                <Link href='/dashboard/settings/kyc'>
               <div className="flex gap-2 items-center bottom-0">
                        <CircleCheck className="text-positive-day" />
                        <p className="text-[12px] text-positive-day">Verified</p>
                        <ChevronRight className="size-4" />
            </div>
            </Link>
               ) : (
             <Link href='/dashboard/settings/kyc'>
             <div className="flex gap-2 items-center bottom-0">
             <CircleX className="text-destructive" />
             <p className="text-[12px] text-destructive">Not Verified</p>
             <ChevronRight className="size-4" />
            </div>
            </Link>
            )}
          </div>
          <Dialog>
          <Popover>
            <PopoverTrigger>
            <button className="bg-[#efefef] h-9 w-9 rounded-full flex items-center justify-center">
            <EllipsisVertical className="size-5" />
            </button>
            </PopoverTrigger>
            <PopoverContent className="flex gap-2 flex-col w-48 mr-4">
                <Link href="/dashboard/settings/profile/edit-profile" className="flex items-center gap-3">
                    <UserPen className="text-content-day size-4" />
                    <p>Edit Profile</p>
                </Link>
                <Link href="/dashboard/settings/profile/referral-list" className="flex items-center gap-3">
                    <ChartNetwork className="text-content-day size-4" />
                    <p>View Referral List</p>
                </Link>
                <Link href="/dashboard/settings/profile/deactivate" className="flex items-center gap-3">
                    <Ban className="text-destructive-day size-4" />
                    <p className="text-destructive-day">Deactivate</p>
                </Link>
            </PopoverContent>
            </Popover>
            </Dialog>
        </div>
        
          {/* second part*/}
        <div className="flex flex-col gap-1 ">
            <p className="font-semibold">Contact</p>
            <div className="flex flex-wrap lg:flex-row flex-col lg:gap-20 gap-7 w-full">
                <div className="flex flex-col gap-1"> 
                    <h4 className="font-medium">Membership ID</h4>
                    <p>{data?.id.slice(0, 8)}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">Phone Number</h4>
                <p>{data?.kyc?.phoneNumber || <p>N/A</p>}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">Email Address</h4>
                <p>{data?.email}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">Gender</h4>
                <p>{data?.kyc?.gender || <p>N/A</p>}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">Date of Birth</h4>
                <p>{data?.kyc?.dob.toLocaleDateString("en-GB") || <p>N/A</p>}</p>
                </div>
            </div>
        </div>
          {/* third part*/}
          <div className="flex flex-col gap-1 ">
            <p className="font-semibold">Address</p>
            <div className="flex  lg:flex-row flex-col lg:gap-20 gap-7 w-full ">
                <div className="flex flex-col gap-1"> 
                    <h4 className="font-medium">Street</h4>
                    <p>{data?.kyc?.address || <p>N/A</p>}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">City</h4>
                <p>{data?.kyc?.city || <p>N/A</p>}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">State</h4>
                <p>{data?.kyc?.state || <p>N/A</p>}</p>
                </div>
                <div className="flex flex-col gap-1">
                <h4 className="font-medium">Country</h4>
                <p>Nigeria</p>
                </div>
            </div>
        </div>
        </div>
       </div>
    </div>
  )
}
