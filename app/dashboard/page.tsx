import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { prisma } from "@/lib/prisma";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRightLeft, Banknote, CalendarCheck, HandCoins, Info, MessageCircleQuestion, Plus, Wallet } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import KYC from "./kyc/page";
import Link from "next/link";
import WalletBalance from "./components/WalletBalance";
import Transactions from "./components/Transactions";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      kyc: true,
      wallet: { select: { balance: true } },
      thriftSavings: { select: { currentAmount: true } },
      categorySavings: { select: { amount: true } },
      loans: { select: { amountDue: true, amountPaid: true } },
      transactions: true,
    },
  });
  return data;
};



export default async function DashBoardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const userId = session.user.id;
  const data = await getData(userId);
  

  const thriftSavingsBalance =
  data?.thriftSavings?.reduce((acc, item) => acc + (item.currentAmount?.toNumber?.() || 0), 0) || 0;

const structuredSavingsBalance =
  data?.categorySavings?.reduce((acc, item) => acc + (item.amount?.toNumber?.() || 0), 0) || 0;

const loanBalance =
  data?.loans?.reduce((acc, loan) => acc + ((loan.amountDue?.toNumber?.() || 0) - (loan.amountPaid?.toNumber?.() || 0)), 0) || 0;

  // Formatter for Nigerian Naira
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);

  return (
    <div className="flex flex-col w-full p-4 gap-12">
      {/* Verification */}
      {(!data?.kyc || data.kyc?.kycstatus === "REJECTED") && (
        <Dialog>
          <div className="flex items-center justify-center">
            <div className="border-[1px] border-[#db2222] rounded-sm lg:w-2/3 w-full h-12 flex justify-between items-center bg-[#fee9e8]">
              <div className="flex items-center">
                <div className="px-2">
                  <Info className="text-icon-day size-7" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-content-day md:text-[13px] text-[12px] font-semibold">
                    Account not Verified
                  </h2>
                  <p className="text-content2-day md:text-[10px] text-[9px] font-light">
                    Complete your KYC verification to gain full access.
                  </p>
                </div>
              </div>
              <div className="p-2">
                <DialogTrigger>
                  <Button className="text-[12px]">Complete KYC</Button>
                </DialogTrigger>
              </div>
            </div>
          </div>
          <DialogContent className="border-primary-day">
            <DialogHeader className="flex items-center justify-between mt-[-7px]">
              <DialogTitle className="text-content-day text-base">Complete KYC</DialogTitle>
            </DialogHeader>
            <KYC />
          </DialogContent>
        </Dialog>
      )}

      {/* Overview */}
      <div className="w-full">
        <div className="mb-7">
          <h1 className="text-xl font-bold text-content2-day">Overview</h1>
        </div>
        {/* Wallets */}
        <div className="flex lg:flex-row flex-col gap-3">
          <div className="bg-gradient-to-r from-hover-btn to-[#2e1905] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-text-button text-[13px]">PERSONAL WALLET</p>
                <div>
                {!data?.wallet ? (
                  <p className="text-text-button font-medium">{formatCurrency(0.00)}</p>
                )
                : 
                <p className="text-text-button font-medium">  ₦{data?.wallet?.balance.toString()}</p>
                }
                </div>
              </div>
              <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
                <Wallet className="size-5 text-text-button" />
              </div>
            </div>
            <div className="w-1/2">
            <Link href="/dashboard/wallet" className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-full rounded-md text-primary-day justify-center">
            <Plus className="size-4" />Deposit
          </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-content-day from-15% to-hover-btn lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-text-button text-[13px]">THRIFT SAVINGS</p>
                <p className="text-text-button text-[15px] font-semibold">
                  {formatCurrency(thriftSavingsBalance)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
                <CalendarCheck className="size-5 text-text-button" />
              </div>
            </div>
            <div className="flex items-start w-full">
              <Link href="/dashboard/savings/thrift" className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-1/2 rounded-md text-primary-day justify-center gap-1">
                <Plus className="size-4" />Save Money
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#a07e13] from-25% to-[#594401] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-text-button text-[13px]">SAVINGS</p>
                <p className="text-text-button text-[15px] font-semibold">
                  {formatCurrency(structuredSavingsBalance)}
                </p>
                <p className="text-text-button text-[12px] font-semibold">
                  Interest<span className="text-[#79f29b] text-[12px] font-semibold"> {formatCurrency(0)}</span>
                </p>
              </div>
              <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
                <HandCoins className="size-5 text-text-button" />
              </div>
            </div>
            <div className="flex items-start w-full">
              <Link href="/dashboard/savings/categories" className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-1/2 rounded-md text-primary-day justify-center gap-1">
                <Plus className="size-4" />Add Funds
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#3e3e3e] to-[black] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-text-button text-[13px]">LOAN</p>
                <p className="text-text-button text-[15px] font-semibold">
                  {formatCurrency(loanBalance)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
                <Banknote className="size-5 text-text-button" />
              </div>
            </div>
            <div className="flex items-start w-full justify-between">
              <p className="text-[12px] text-text-button">
                Installment {formatCurrency(0)}
              </p>
              <Link href="/dashboard/loans" className="bg-text-button text-[11px] p-1 flex items-center w-1/3 rounded-md text-content-day justify-center gap-1">
                Payback
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full border-[1px] border-primary-active h-20 bg-active-nav flex justify-between items-center rounded-md">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <MessageCircleQuestion className="size-5 text-icon-day ml-1" />
            <p className="text-sm font-semibold text-content-day">
              Need some emergency fund?
            </p>
          </div>
          <div className="ml-7">
            <p className="text-[12px] font-light text-content-day">
              You might be eligible for Loan Type 1
            </p>
          </div>
        </div>
        <div>
          <div className="p-2">
            <Link href="/dashboard/loans">
              <Button className="text-[12px]">Request Loan</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-3 w-full">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full p-5">
            <h2 className="text-xl text-content-day font-bold">
              My Transaction History
            </h2>
            <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
          </div>
          {data?.transactions.length ? (
            <Transactions transactions={data.transactions} />
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center h-[40vh]">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-outline-day">
                <ArrowRightLeft className="size-6 text-icon-day" />
              </div>
              <p>
                All transaction history— savings, deposit, withdrawals, loan repayment will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
      {data?.loans && data.loans.length > 0 && (
        <div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full p-2">
              <h2 className="text-xl text-content-day font-bold">Current Loan</h2>
              <button className="p-2 bg-light-overlay rounded-2xl">View Details</button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex lg:flex-row flex-col lg:gap-7 gap-2 lg:bg-text-button bg-active-nav items-start lg:p-0 p-2 rounded-md">
                <p className="text-xl font-bold text-content-day">&#8358;450,000.00</p>
                <p className="text-content-day">
                  Outstanding Balance: <span className="font-semibold">123,000.00</span>
                </p>
                <p className="text-content-day">
                  Duration: <span className="font-semibold">3 Months</span>
                </p>
                <p className="text-content-day">
                  Interest: <span className="font-semibold">10%</span>
                </p>
              </div>
              <p>Loan ID: LID-3457</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
