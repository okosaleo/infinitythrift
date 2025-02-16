import { Banknote, Info } from "lucide-react"
import Link from "next/link"


export default function Loanpage() {
  return (
<div className="flex flex-col gap-2">
<div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center px-7">
    <h1 className="text-2xl font-semi-bold text-content-day">Loans</h1>
</div>
<div className="flex justify-center items-center p-2">
  <div className="bg-active-nav w-[78vh] border-outline-day border justify-evenly p-1 flex items-center gap-2">
    <div>
    <Info className="size-7 text-icon-day" />
    </div>
    <p className="text-content2-day md:text-sm text-[11px]">Sorry You’re not eligible for a Loan. Save up to 500,000.00 to qualify for Loan Type 1 </p>
    <Link href="/dashboard" className="text-text-button text-center py-2 px-2 md:text-[13px] text-[11px] bg-primary-day rounded-md ">Go To DashBoard</Link>
  </div>
</div>
<div className="w-full py-10 px-5 ">
    {/*loan card */}
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
            <p className="text-[12px] text-text-button ">Sorry you are not eligible for a loan</p>
          </div>
        </div>
</div>

     {/* lONA hISTORY */}
     <div className="p-4">
     <div className="flex items-center justify-between w-full">
      <h2 className="text-2xl text-content2-day font-medium">Loan History</h2>
      <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
     </div>
     <div className="flex flex-col gap-3 items-center justify-center h-[50vh]">
      <div className="rounded-full w-12 h-12 bg-outline-day flex items-center justify-center">
        <Banknote className="text-icon-day size-6"/>
      </div>
      <p>You have no loan history</p>
     </div>
     </div>

</div>
  )
}
