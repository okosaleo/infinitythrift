
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArchiveRestore,  EllipsisVerticalIcon, Plus,  } from "lucide-react";

import Thrift from "./Thrift";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ThriftSavingsTracker } from "@prisma/client";
import ThriftTransactions from "./components/Transactions";
import TransferFunds from "../../wallet/component/Transfer";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      thriftSavings: { 
        include: {  
          trackers: true
        }
      },
      wallet:{
        select: {balance: true}
      },
      transactions: {
        where: {
          destinationType: "THRIFT_SAVINGS"
        }
      }
    }
  });
  return data;
};



export default async function ThriftPage() {
     const session = await auth.api.getSession({ headers: await headers() });
      if (!session) {
        redirect("/sign-in");
      }
    
      const userId = session.user.id;
      const data = await getData(userId);

      const calculateProgress = (trackers: ThriftSavingsTracker[]) => {
        const totalDaysSaved = trackers.reduce((count, tracker) => {
          return count + [
            tracker.monday, 
            tracker.tuesday, 
            tracker.wednesday, 
            tracker.thursday, 
            tracker.friday, 
            tracker.saturday, 
            tracker.sunday
          ].filter(Boolean).length; // Count only "true" days
        }, 0);
      
        return (totalDaysSaved / 31) * 100; // Convert to percentage
      };
      
  return (
    <div className="flex flex-col gap-2">
        {/* Heading */}
        <div>
            <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center px-7">
                <h1 className="text-2xl font-semi-bold text-content-day">Thrift Savings</h1>
            </div>
            <div className="border-b-[1px] border-b-outline-day h-7 w-full flex items-center px-7">
                <p className="text-sm text-content-day font-normal">Savings / Thrift Savings</p>
            </div>
        </div>
         {/* Box */}
         <div className="px-5 flex lg:flex-row flex-col justify-between w-full">
            <div className="flex lg:grid grid-cols-3 flex-col gap-4 w-full">
            {(!data?.thriftSavings || data.thriftSavings.length === 0) ? (
  <div className="lg:w-full w-full border-[1px] hover:border-content-day border-outline-day flex flex-col gap-1 rounded-md shadow-md mt-20 px-4 py-3">
    <div className="flex justify-between">
      <p className="text-sm text-content-day">Thrift Plan</p>
      <EllipsisVerticalIcon className="size-7 text-content-day cursor-pointer" />
    </div>
    <div>
      <p className="text-xl text-content-day font-bold">&#8358; 0.00</p>
    </div>
    <Dialog>
      <div className="w-full flex gap-2">
        <DialogTrigger className="w-full">
          <Button className="flex items-center flex-row gap-2 w-full">
            <Plus className="size-5 text-text-button" />
            <p className="text-[13px] text-text-button">Save Money</p>
          </Button>
        </DialogTrigger>
        <Link
          href="/dashboard/wallet"
          className="bg-text-button hover:bg-active-nav border-outline-day border-[1.3px] flex items-center justify-center rounded-md flex-row gap-2 w-full"
        >
          <ArchiveRestore className="size-5 text-content-day" />
          <p className="text-[13px] text-content-day">Withdraw</p>
        </Link>
      </div>
      <DialogContent className="border-primary-day">
        <Thrift />
      </DialogContent>
    </Dialog>
  </div>
) : (
  data.thriftSavings.map((item) => (
    <div
      key={item.id}
      className="lg:w-full w-full border-[1px] hover:border-content-day border-outline-day flex flex-col gap-1 rounded-md shadow-md mt-20 px-4 py-3"
    >
      <div className="flex justify-between">
        <p className="text-sm text-content-day">Thrift Plan</p>
        <EllipsisVerticalIcon className="size-7 text-content-day cursor-pointer" />
      </div>
      <div>
        <p className="text-xl text-content-day font-bold">
          &#8358;{item.currentAmount.toString()}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-content-day">My Interests</p>
        <p className="text-positive-day font-bold">
          &#8358;{item.currentAmount.toString()}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-content-day">Progress</p>
        <p className="text-primary-day font-bold">
          {calculateProgress(item.trackers).toFixed(2)}%
        </p>
      </div>
      <Dialog>
        <div className="w-full flex gap-2">
          <DialogTrigger className="w-full">
            <Button className="flex items-center flex-row gap-2 w-full">
              <Plus className="size-5 text-text-button" />
              <p className="text-[13px] text-text-button">Save Money</p>
            </Button>
          </DialogTrigger>
          <Link
            href="/dashboard/wallet"
            className="bg-text-button hover:bg-active-nav border-outline-day border-[1.3px] flex items-center justify-center rounded-md flex-row gap-2 w-full"
          >
            <ArchiveRestore className="size-5 text-content-day" />
            <p className="text-[13px] text-content-day">Withdraw</p>
          </Link>
        </div>
        <DialogContent className="border-primary-day">
          <Thrift />
        </DialogContent>
      </Dialog>
    </div>
  ))
)}

            </div>
            <div className="flex justify-start items-start w-1/5 mt-10">
            </div>
         </div>
         <div className="w-full p-4">
         <TransferFunds userId={data?.id} walletBalance={data?.wallet?.balance.toNumber()} thriftPlans={data?.thriftSavings} />
         </div>
         {/* Transactions */}
         <ThriftTransactions  thriftSavings={data?.thriftSavings || []}
          transactions={data?.transactions || []}
          />
    </div>
  )
}
