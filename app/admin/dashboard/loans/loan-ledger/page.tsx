import { Plus, Search } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col gap-2">
    <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
           <h1 className="md:text-2xl text-xl font-semi-bold text-content-day">Loan Repayment Ledger</h1>
           <div className='flex gap-3 items-center justify-center'>
            <Search className='size-6 text-icon-day' />
            <button className='p-2 flex items-center bg-primary-active gap-2 rounded-md'>
              <Plus className='size-4 text-text-button' />
              <p className='md:text-sm text-[12px] text-text-button'>Create Loan</p>
              </button>
          </div>
       </div>
       <div className='w-full p-5 flex'>
        <div className='flex lg:flex-row flex-col items-center gap-3 w-full'>
          <div className='p-3 flex lg:w-1/4 w-full flex-col gap-2 border-[1px] border-outline-day rounded-md'>
            <p className='font-medium text-sm'>TOTAL LOANS DIBURSED</p>
            <p className='font-bold '>&#8358;6,780,000</p>
          </div>
          <div className='p-3 flex lg:w-1/4 w-full flex-col gap-2 border-[1px] border-outline-day rounded-md'>
            <p className='font-medium text-sm'>TOTAL NUMBER OF LOANS</p>
            <p className='font-bold '>34</p>
          </div>
          <div className='p-3 flex lg:w-1/4 w-full flex-col gap-2 border-[1px] border-outline-day rounded-md'>
            <p className='font-medium text-sm'>OUTSTANDING LOAN BALANCE</p>
            <p className='font-bold '>&#8358;6,780,000</p>
          </div>
        </div>
       </div>
       <div className='w-full p-5 flex justify-between'>
        <div className='flex gap-2'>
        <button className='bg-[#eaecec] p-2 rounded-2xl hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905] text-[#6c6c6c] active: text-sm'>Active(34)</button>
        <button className='bg-[#eaecec] p-2 rounded-2xl hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905] text-[#6c6c6c] text-sm'>Overdue(3)</button>
        </div>
        <button className='bg-[#eaecec] p-2 rounded-2xl hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905] text-[#6c6c6c] text-sm'>Settled Loans</button>
       </div>
    </div>
  )
}
