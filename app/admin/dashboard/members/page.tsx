import { Plus, Search } from 'lucide-react'
import React from 'react'

export default function Members() {
  return (
    <div className="flex flex-col gap-2">
       <div className="border-b-[1px] bg-[#f7f8f8] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
          <h1 className="text-2xl font-semi-bold text-content-day">Members</h1>
          <div className='flex gap-3 items-center justify-center'>
            <Search className='size-6 text-icon-day' />
            <button className='p-2 flex items-center bg-primary-active gap-2 rounded-md'>
              <Plus className='size-4 text-text-button' />
              <p className='text-sm text-text-button'>Create New Member</p>
              </button>
          </div>
         </div>

         <div className='flex flex-row gap-6 items-center mt-5 ml-5'>
         <button className='bg-[#eaecec] p-2 rounded-2xl hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905] text-[#6c6c6c] text-sm'>All(0)</button>
         <button className='bg-[#eaecec] p-2 rounded-2xl text-[#6c6c6c] text-sm hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905]'>Active (0)</button>
         <button className='bg-[#eaecec] p-2 rounded-2xl text-[#6c6c6c] text-sm hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905]'>Inactive (0)</button>
         <button className='bg-[#eaecec] p-2 rounded-2xl text-[#6c6c6c] text-sm hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905]'>Verified (0)</button>
         <button className='bg-[#eaecec] p-2 rounded-2xl text-[#6c6c6c] text-sm hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905]'>Unverified (0)</button>
         <button className='bg-[#eaecec] p-2 rounded-2xl text-[#6c6c6c] text-sm hover:text-text-button hover:bg-gradient-to-r from-hover-btn to-[#2e1905]'>New Members (0)</button>
         </div>
    </div>          
  )
}
