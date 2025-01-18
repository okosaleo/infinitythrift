import { Button } from "@/components/ui/button";
import { Banknote, CalendarCheck, HandCoins, Info, MessageCircleQuestion, Plus, Wallet } from "lucide-react";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col w-full p-4 gap-12">
      {/* Verification */}
      <div className="flex items-center justify-center">
        <div className="border-[1px] border-[#db2222] rounded-sm lg:w-2/3 w-full h-12 flex justify-between items-center bg-[#fee9e8]">
        <div className="flex items-center">
          <div className="px-2"><Info className="text-icon-day size-7" /></div>
          <div className="flex flex-col items-start">
            <h2 className="text-content-day md:text-[13px] text-[12px] font-semibold">Account not Verified</h2>
            <p className="text-content2-day md:text-[10px] text-[9px] font-light">Complete your KYC verification to gain full access.</p>
          </div>
        </div>
        <div className="p-2"><Button className="text-[12px]">Complete KYC</Button></div>
        </div>
      </div>
      {/* OverView */}
      <div className="w-full">
        <div className="mb-7">
          <h1 className="text-xl font-bold text-content2-day">Overview</h1>
        </div>
        {/* Wallets */}
        <div className="flex lg:flex-row flex-col gap-3">
        <div className="bg-gradient-to-r from-hover-btn to-[#2e1905] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5 ">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">PERSONAL WALLET</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; 12,093,812.00</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <Wallet className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-1/2 rounded-md text-primary-day justify-center gap-1"><Plus className="size-4" />Deposit</button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-content-day from-15% to-hover-btn lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">THRIFT SAVINGS</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; 12,093,812.00</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <CalendarCheck className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-1/2 rounded-md text-primary-day justify-center gap-1"><Plus className="size-4" />Save Money</button>
          </div></div>
        <div className="bg-gradient-to-r from-[#a07e13] from-25% to-[#594401] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">SAVINGS</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; 12,093,812.00</p>
            <p className="text-text-button text-[12px] font-semibold">Interest<span className="text-[#79f29b] text-[12px] font-semibold"> &#8358; 12,093,812.00</span></p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <HandCoins className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full">
            <button className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-1/2 rounded-md text-primary-day justify-center gap-1"><Plus className="size-4" />Add Funds</button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#3e3e3e] to-[black] lg:w-1/4 w-full h-32 rounded-md flex-col flex justify-between p-5">
        <div className=" justify-between flex">
          <div className="flex flex-col gap-1">
            <p className="text-text-button text-[13px]">LOAN</p>
            <p className="text-text-button text-[15px] font-semibold"> &#8358; 0.00</p>
          </div>
          <div className="h-10 w-10 rounded-md bg-[#efefef3b] flex items-center justify-center">
            <Banknote className="size-5 text-text-button" /></div>
          </div>
          <div className="flex items-start w-full justify-between">
            <p className="text-[12px] text-text-button ">Installment &#8358; 0.00</p>
            <button className="bg-text-button text-[11px] p-1 flex items-center w-1/3 rounded-md text-content-day justify-center gap-1">Payback</button>
          </div>
        </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full border-[1px] border-primary-active h-20 bg-active-nav flex justify-between items-center rounded-md">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <MessageCircleQuestion className="size-5 text-icon-day ml-1" />
            <p className="text-sm font-semibold text-content-day">Need some emergency fund?</p>
          </div>
          <div className="ml-7">
          <p className="text-[12px] font-light text-content-day"> You&apos;re eligible for Loan Type 1</p>
          </div>
        </div>
        <div>
        <div className="p-2"><Button className="text-[12px]">Request Loan</Button></div>
        </div>
      </div>
      <div className="flex flex-col ml-3 w-full">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full p-5">
            <h2 className="text-xl text-content-day font-bold">My Transaction History</h2>
            <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
      <div>
      <div className="flex flex-col w-full">
          <div className="flex justify-between w-full p-2">
            <h2 className="text-xl text-content-day font-bold">Current Loan</h2>
            <button className="p-2 bg-light-overlay rounded-2xl">View Details</button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex lg:flex-row flex-col lg:gap-7 gap-2 lg:bg-text-button bg-active-nav items-start lg:p-0 p-2 rounded-md">
              <p className="text-xl font-bold text-content-day"> &#8358;450,000.00</p>
              <p className="text-content-day">Outstanding Balance: <span className="font-semibold">123,000.00</span></p>
              <p className="text-content-day">Duration: <span className="font-semibold">3 Months</span></p>
              <p className="text-content-day">Interest: <span className="font-semibold">10%</span></p>
            </div>
            <p>Loan ID: LID-3457</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}
