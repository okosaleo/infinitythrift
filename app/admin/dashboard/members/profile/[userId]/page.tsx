
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { prisma } from "@/lib/prisma";
import { ThriftSavings, ThriftSavingsTracker } from "@prisma/client";
import { Ban, Banknote, CalendarCheck, CheckCircle2, ChevronRight, CircleAlert, EllipsisVertical, GitMerge, HandCoins, Wallet } from "lucide-react";
import Link from "next/link";


const getData = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      kyc: true,
      wallet: true,
      thriftSavings: {
        include: {
          trackers: {
            orderBy: { weekStart: 'asc' }
          }
        }
      },
      categorySavings: true,
      loans: {
        include: {
          product: true
        }
      },
      transactions: {
        orderBy: { createdAt: 'desc' },
        where: {
          OR: [
            { sourceType: 'WALLET' },
            { destinationType: 'WALLET' }
          ]
        }
      },
    },
  });
};

const getThriftDayDetails = (thrift: ThriftSavings) => {
  let dayCount = 0;
  const deposits: { day: number; date: Date; amount: number }[] = [];

  thrift.trackers.forEach(tracker => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      if (tracker[day as keyof ThriftSavingsTracker]) {
        dayCount++;
        const dayOffset = days.indexOf(day);
        const depositDate = new Date(tracker.weekStart);
        depositDate.setDate(depositDate.getDate() + dayOffset);
        deposits.push({
          day: dayCount,
          date: depositDate,
          amount: thrift.dailyAmount.toNumber()
        });
      }
    });
  });

  return deposits;
};

const formatDate = (date: Date) => 
  new Date(date).toLocaleDateString('en-NG', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });


const getTransactionDetails = (transaction: Transaction) => {
  const amount = transaction.amount.toNumber();
  const isCredit = transaction.destinationType === 'WALLET' || 
                   transaction.type === 'SAVINGS_DEPOSIT' ||
                   transaction.type === 'LOAN_DISBURSEMENT';

  return {
    amount: isCredit ? amount : -amount,
    type: transaction.type.replace(/_/g, ' '),
    direction: isCredit ? 'CREDIT' : 'DEBIT',
    date: new Date(transaction.createdAt),
    reference: transaction.reference,
    description: transaction.description
  };
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
                    <Link href={`/admin/dashboard/members/profile/referee/${data?.id}`}>View Referee List</Link>
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
        <Dialog>
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            
            <p className="text-text-button text-[13px]">PERSONAL WALLET</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; {data?.wallet?.balance.toString() || 0}</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <Wallet className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <DialogTrigger>
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" />
            </button>
            </DialogTrigger>
          </div>
          <DialogContent className="h-[80vh] overflow-y-scroll flex items-center flex-col">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>
                Wallet History
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
    {data?.transactions?.filter(t => 
      t.sourceType === 'WALLET' || t.destinationType === 'WALLET'
    ).length === 0 ? (
      <div className="text-center py-4">No wallet transactions found</div>
    ) : (
      data?.transactions
        .filter(t => t.sourceType === 'WALLET' || t.destinationType === 'WALLET')
        .map(transaction => {
          const details = getTransactionDetails(transaction);
          return (
            <div key={transaction.id} className="p-1 rounded-lg">
              <div className="flex justify-around items-start">
                {details.direction === 'CREDIT' ? (
                  <div className="flex justify-center bg-positive-day items-center rounded-md h-12 w-12">
                    <HandCoins className="text-text-button size-5" />
                </div>
                  
                ) : (
                  <div className="flex justify-center bg-destructive items-center rounded-md h-2 w-12">
                  <Wallet className="text-text-button size-5" />
              </div>
                )
                }
                

                <div>
                  <p className="font-medium text-sm text-content-day">{details.type}</p>
                  <p className="text-sm">{details.reference}</p>
                <p className="text-[#8E95A2] text-[13px]"> {details.date.toLocaleDateString()} - {details.description}</p>
                </div>
                <span className={`${details.direction === 'CREDIT' ? 'text-green-500' : 'text-destructive'}`}>
                &#8358;  {details.amount}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
              </div>
            </div>
          );
        })
    )}
    </div>
          </DialogContent>
          </Dialog>
        </div>
        <div className="bg-gradient-to-br from-content-day from-15% to-hover-btn lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <Dialog>
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
            <DialogTrigger>
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" />
            </button>
            </DialogTrigger>
          </div>
          <DialogContent className="h-[80vh] overflow-y-scroll flex items-center flex-col w-full">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>
                Thrift History
              </DialogTitle>
            </DialogHeader>
            <div className="w-full">
    {data?.thriftSavings?.length === 0 ? (
      <div className="text-center py-4">No thrift plans found</div>
    ) : (
      data?.thriftSavings?.map(thrift => {
        const deposits = getThriftDayDetails(thrift);
        return (
          <div key={thrift.id} className="p-1 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{thrift.category} Thrift</h3>
                <p className="text-sm text-content-day">
                  Daily: {thrift.dailyAmount.toNumber()}
                </p>
              </div>
              <span className="text-sm text-[#0B2DA7]">
                Total: {thrift.currentAmount.toNumber()}
              </span>
            </div>

            {deposits.length === 0 ? (
              <div className="text-center py-2 text-gray-500">
                No deposits yet
              </div>
            ) : (
              deposits.map(deposit => (
                <div key={deposit.day} className="flex justify-between py-2 border-t">
                  <div>
                    <span className="font-medium">Day {deposit.day}</span>
                    <span className="text-sm text-[#8E95A2] ml-2">
                      ({formatDate(deposit.date)})
                    </span>
                  </div>
                  <span className="text-[#0B2DA7]">
                    +{deposit.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        );
      })
    )}
  </div>
            
          </DialogContent>
          </Dialog>
          </div>
        <div className="bg-gradient-to-r from-[#a07e13] from-25% to-[#594401] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <Dialog>
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">SAVINGS</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; {data?.categorySavings
                        .reduce((sum, s) => sum + s.amount.toNumber(), 0)
                        .toLocaleString('en-NG')}</p>
            <p className="text-text-button text-[12px] font-semibold">Interest<span className="text-[#79f29b] text-[12px] font-semibold"> &#8358; </span></p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <HandCoins className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <DialogTrigger>
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" />
            </button>
            </DialogTrigger>
          </div>
          <DialogContent className="h-[80vh] overflow-y-scroll flex items-center flex-col">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>
                Savings History
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 w-full">
    {data?.categorySavings?.length === 0 ? (
      <div className="text-center py-4">No category savings found</div>
    ) : (
      data?.categorySavings?.map(saving => (
        <div key={saving.id} className="p-2 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="rounded-full w-12 h-12 bg-[#f7f8f8] flex items-center justify-center">
              <Wallet className="text-icon-day size-4" />
            </div>
            <div>
              <h3 className="font-semibold text-xs">{saving.category} Savings</h3>
              <p className="text-xs text-[#8E95A2]">
                {saving.startDate.toLocaleDateString()} - {saving.endDate.toLocaleDateString()}
              </p>
            </div>
            <span className="text-green-500">
              {saving.amount.toNumber()}
            </span>
          </div>
          <div className="mt-2 text-sm">
            Interest Rate: {saving.interestRate}%
          </div>
        </div>
      ))
    )}
  </div>
          </DialogContent>
          </Dialog>
        </div>
        <div className="bg-gradient-to-r from-[#3e3e3e] to-[black] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <Dialog>
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
            <DialogTrigger>
            <button className=" text-[12px] flex items-center w-full rounded-md text-[#FDCA28] justify-center gap-1">Transaction History <ChevronRight className="size-4" />
            </button>
            </DialogTrigger>
          </div>
          <DialogContent className="h-[80vh] overflow-y-scroll flex items-center flex-col">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>
                Loan History
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
            {data?.loans?.length === 0 ? (
      <div className="text-center py-4">No loans found</div>
    ) : (
      data?.loans?.map(loan => (
        <div key={loan.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{loan.product.type}</h3>
              <p className="text-sm text-gray-500">
                {loan.status} - Due {loan.dueDate?.toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-green-500">
                +{formatAmount(loan.amount.toNumber())}
              </p>
              <p className="text-sm">
                Paid: {formatAmount(loan.amountPaid.toNumber())}
              </p>
            </div>
          </div>
          <div className="mt-2 text-sm">
            Interest Rate: {loan.product.interestRate}%
          </div>
        </div>
      ))
    )}
  </div>
          </DialogContent>
          </Dialog>
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
