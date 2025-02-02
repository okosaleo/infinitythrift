import { ListFilter, Search } from "lucide-react";


export default function LoansPage() {
  return (
    <div className="flex flex-col gap-2">
    <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
           <h1 className="md:text-2xl text-xl font-semi-bold text-content-day">Savings Account</h1>
           <div className='flex gap-3 items-center justify-center'>
            <Search className='size-6 text-icon-day' />
            <ListFilter className='size-6 text-icon-day ' />
          </div>
          </div>

          <div className='w-full p-5 flex'>
        <div className='flex lg:flex-row flex-col items-center gap-3 w-full'>
          <div className='p-3 hover:bg-active-nav hover:text-primary-day flex lg:w-1/4 w-full flex-col gap-2 border-[1px] border-outline-day rounded-md'>
            <p className='font-medium text-sm'>TOTAL LOANS</p>
            <p className='font-bold '>&#8358;6,780,000</p>
          </div>
        </div>
       </div>
    </div>
  )
}
