
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { prisma } from "@/lib/prisma";
import { Ban, Banknote, CalendarCheck, CheckCircle2, ChevronRight, CircleAlert, EllipsisVertical, GitMerge, HandCoins, Wallet } from "lucide-react";
import Link from "next/link";



const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
        id: userId,
    },
    include: {
      kyc: true,
      wallet: true,
      thriftSavings: true,
      structuredSavings: true,
      loans: true,
    },
  });

  return data
};


export default async function ProfilePage({params}: { params: Promise<{ userId: string }>}) {
  const { userId } = await params;
  const data = await getData(userId);
  
  return (
    <div className="flex flex-col gap-2">
    <div className="border-b-[1px] bg-[#f7f8f8] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
       <h1 className="text-2xl font-semi-bold text-content-day">Member Profile</h1>
    </div>
    <div className="p-4 flex w-full">
      <div className="w-full bg-[#f7f8f8] h-[79vh] ">
        <div className="flex flex-row items-center justify-center">
          <div className="w-[97%] flex items-center justify-center mt-8">
            <div className="w-24 h-24 flex items-center bg-[#efefef] rounded-full font-medium uppercase text-2xl justify-center">{data?.name.slice(0, 2)} 
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col border-0 gap-2 bg-[#ffffff] mr-7 p-2 rounded-md">
            <DropdownMenuItem>
                <div className='flex flex-row gap-2 items-center'>
                    <Wallet className='size-4' />
                    <Link href={`/admin/dashboard/members/profile/wallet/${data?.id}`}>Refund Wallet</Link>
                  </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className='flex flex-row gap-2 items-center'>
                    <GitMerge className='size-4' />
                    <Link href="/admin/dashboard/members">View Referee List</Link>
                  </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form className='flex flex-row gap-2 items-center text-destructive-day'>
                    <Ban className='size-4' />
                    <p>Disable</p>
                  </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center mt-8 w-[97%] ">
          <div className="flex items-center gap-2">
          <p className="text-2xl">{data?.name}</p>
          {data?.kyc?.kycstatus === "APPROVED" ? (
            <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-positive-day" />
    <p className="text-sm text-positive-day">Verified</p>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <CircleAlert className="size-5 text-destructive-day" />
    <p className="text-sm text-destructive-day">Not verified</p>
    </div>
  )}
          </div>
          <p className="text-sm">Signed up: {data?.createdAt.toLocaleString()}</p>
        </div>
        <div className="w-full mt-12 p-5">
        {/* Wallets */}
        <div className="flex lg:flex-row flex-col gap-3">
        <div className="bg-gradient-to-r from-hover-btn to-[#2e1905] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5 ">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">PERSONAL WALLET</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; {data?.wallet?.balance.toString() || 0}</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <Wallet className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" /></button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-content-day from-15% to-hover-btn lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">THRIFT SAVINGS</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358;  {data?.thriftSavings
                        .reduce((sum, s) => sum + s.currentAmount.toNumber(), 0)
                        .toLocaleString('en-NG')}</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <CalendarCheck className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" /></button>
          </div></div>
        <div className="bg-gradient-to-r from-[#a07e13] from-25% to-[#594401] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">SAVINGS</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; {data?.structuredSavings
                        .reduce((sum, s) => sum + s.currentAmount.toNumber(), 0)
                        .toLocaleString('en-NG')}</p>
            <p className="text-text-button text-[12px] font-semibold">Interest<span className="text-[#79f29b] text-[12px] font-semibold"> &#8358; </span></p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <HandCoins className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" /></button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#3e3e3e] to-[black] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">LOAN</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; {data?.loans
                        .filter(loan => ['APPROVED', 'ACTIVE', 'PAID', 'DEFAULTED'].includes(loan.status))
                        .reduce((sum, loan) => sum + loan.amount.toNumber(), 0)
                        .toLocaleString('en-NG')}</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <Banknote className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" /></button>
          </div>
        </div>
        </div>
      </div>


        <div className="flex flex-col gap-3 mt-14">
          <div className="p-4">
            <p className="text-xl font-medium">Contact</p>
          </div>

          <div className="ml-5 md:block gap-3 flex">
            <div className="md:grid flex flex-col grid-cols-3 gap-2">
              <p>Membership ID</p>
              <p>Phone Number</p>
              <p>Email Address</p>
            </div>
            <div className="md:grid flex flex-col grid-cols-3 gap-2">
              <p>{data?.kyc?.userId.slice(0, 8)}</p>
              <p>{data?.kyc?.phoneNumber || "N/A"}</p>
              <p>{data?.email}</p>
            </div>
          </div>

          <h2 className="ml-5 text-xl font-medium">Identification</h2>
          <div className="ml-5 md:block gap-3 flex">
            <div className="md:grid flex flex-col grid-cols-4 gap-1">
              <p>Date Of Birth</p>
              <p>Gender</p>
              <p>Address</p>
              <p>KYC Verification</p>
            </div>
            <div className="md:grid flex flex-col grid-cols-4 gap-1">
              <p>{data?.kyc?.dob.toLocaleDateString() || "N/A"}</p>
              <p>{data?.kyc?.gender || "N/A"}</p>
              <p>{data?.kyc?.address}</p>
              <Link href={`/admin/dashboard/members/profile/kyc/${data?.id}`} className="text-primary-active w-[140px] flex gap-2 items-center">
                <p>View</p>
                <ChevronRight className="size-4 text-icon-day" />
              </Link>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div></div>

      </div>
    </div>
    </div>
  )
}
