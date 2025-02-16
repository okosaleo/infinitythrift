import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function Thrift() {
  return (
    <div className='w-full flex flex-col gap-6 p-1'>
      <form>
      <div className='w-full flex flex-col gap-2'>
        <Label>Thrift Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select Thrift Category' className='rounded-md text-[12.5px] border border-input' />
          </SelectTrigger>
          <SelectContent className='text-[12px]'>
            <SelectItem value='Bronze'>
              <div className='flex gap-1 text-[12px]'>
              <p>Bronze</p>
              <p>&#8358;1000 - 5000</p>
              </div>
            </SelectItem>
            <SelectItem value='Silver'>
              <div className='flex text-[12px] gap-1'>
              <p>Silver</p>
              <p>&#8358;5000 - 20000</p>
              </div>
            </SelectItem>
            <SelectItem value='Gold'>
              <div className='flex text-[12px] gap-1'>
              <p>Gold</p>
              <p>&#8358;21,000 - 50,000</p>
              </div>
            </SelectItem>
            <SelectItem value='Infinity'>
              <div className='flex text-[12px] gap-1'>
              <p>Infinity</p>
              <p>&#8358;51,000 - infinity</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-4'>
        <Label>Daily Amount(&#8358;)</Label>
        <Input />
      </div>

      <div className='mt-4'>
        <Label>Description</Label>
        <Textarea />
      </div>

      <Button className='mt-4 w-full'>Proceed To Summary</Button>
      </form>
    </div>
  )
}
