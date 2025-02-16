import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeft, ScrollText } from "lucide-react";
import Link from "next/link";
import KYC from "../../kyc/page";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

type DataType = {
  kyc?: {
    status?: string;
  };
};

export default async function KYCpage() {
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
       <h1 className="text-2xl font-semibold text-content-day">Settings</h1>
      </div><div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
       <h1 className="text-sm font-semi-bold text-content-day ml-3">Settings / KYC /</h1>
      </div>
      {!data?.kyc || data?.kyc?.status === "REJECTED" (
      <Dialog>
      <div className="w-full flex items-center justify-center h-[70vh] flex-col gap-2 p-5">
        <div className="h-14 w-14 rounded-full bg-[#f7f8f8] flex items-center justify-center">
            <ScrollText className="size-5 text-content-day" />
        </div>
        <div>
            <p className="md:text-base text-[13px] w-full">Complete your KYC verification to have full access.</p>
        </div>
        <div>
        <DialogTrigger>
            <Button>Complete KYC</Button>
         </DialogTrigger>
        </div>
      </div>
      <DialogContent  className="border-0">
    <DialogHeader className="flex items-center justify-between">
      <DialogTitle className="text-content-day">Complete KYC</DialogTitle>
      <DialogTitle className="text-content2-day text-sm font-light">Personal Information</DialogTitle>
      <DialogTitle className="text-content2-day text-sm font-light">1/4</DialogTitle>
    </DialogHeader>
    <KYC />
  </DialogContent>
      </Dialog>)
      }
  </div>

  )
}
