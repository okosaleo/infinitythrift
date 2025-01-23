import { Banknote } from "lucide-react"


export default function Loanpage() {
  return (
<div className="flex flex-col gap-2">
<div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center px-7">
    <h1 className="text-2xl font-semi-bold text-content-day">Loans</h1>
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
            <p className="text-[12px] text-text-button ">You&apos;re eligible for loan type 1</p>
            <button className="bg-text-button text-[11px] p-1 flex items-center w-1/3 rounded-md text-content-day justify-center gap-1">Request Loan</button>
          </div>
        </div>
</div>
</div>
  )
}
