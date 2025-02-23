"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Thrift() {
  const [showSummary, setShowSummary] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dailyAmount, setDailyAmount] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleProceed = () => {
    // Basic check to show summary (further validation is done server-side)
    if (selectedCategory && dailyAmount) {
      setShowSummary(true)
    }
  }

  const handleConfirm = async () => {
    try {
      const amount = Number(dailyAmount)
      // Send data to the API route. Note that the API route expects dailyAmount as a number.
      const response = await fetch('/api/thrift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          dailyAmount: amount,
          description,
          totalAmount: amount * 31 // first payment covers the service fee + 30 days
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error)
      }

      // On success, log the plan details and reset the form.
      console.log({
        category: selectedCategory,
        dailyAmount: amount,
        description
      })
      setShowSummary(false)
      setSelectedCategory('')
      setDailyAmount('')
      setDescription('')
      setError('')
    } catch (error) {
      console.error("Thrift creation error:", error)
      setError(error instanceof Error ? error.message : "Failed to create plan")
    }
  }

  return (
    <div className='w-full flex flex-col gap-6 p-1'>
      {!showSummary ? (
        <>
          <div className='w-full flex flex-col gap-1'>
            <div className='flex items-center justify-center'>
              <h1 className='text-xl font-medium'>Enter Savings Details</h1>
            </div>
            <Label className='mt-2'>Thrift Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                  <div className='flex gap-1 text-[12px]'>
                    <p>Silver</p>
                    <p>&#8358;5000 - 20000</p>
                  </div>
                </SelectItem>
                <SelectItem value='Gold'>
                  <div className='flex gap-1 text-[12px]'>
                    <p>Gold</p>
                    <p>&#8358;21,000 - 50,000</p>
                  </div>
                </SelectItem>
                <SelectItem value='Infinity'>
                  <div className='flex gap-1 text-[12px]'>
                    <p>Infinity</p>
                    <p>&#8358;51,000 - infinity</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='mt-1'>
            <Label>Daily Amount (&#8358;)</Label>
            <Input 
              type='number'
              value={dailyAmount}
              onChange={(e) => setDailyAmount(e.target.value)}
            />
          </div>

          <div className='mt-1'>
            <Label>Description</Label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className='mt-4 w-full' onClick={handleProceed}>
            Proceed To Summary
          </Button>
        </>
      ) : (
        <div className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex items-center justify-center mb-4'>
              <h2 className='font-medium text-xl'>Summary</h2>
            </div>
            <div className='flex items-center justify-center text-2xl'>
              <h3 className='font-semibold'>
                &#8358;{Number(dailyAmount).toLocaleString()} {/* Daily amount */}
              </h3>
            </div>
            
            <div className='space-y-4'>
              {description && (
                <div className='flex w-full p-3 justify-between items-center border-b-[1px] border-b-outline-day'>
                  <p className='text-sm text-muted-foreground'>Description</p>
                  <p className='font-medium'>{description}</p>
                </div>
              )}
              <div className='flex flex-col items-center justify-center w-full p-3'>
                <p className='font-medium text-xs text-content2-day'>{selectedCategory}</p>
                <div className='flex justify-between w-full items-center text-sm font-medium'>
                  <p>Charges</p>
                  <p>&#8358;{Number(dailyAmount).toLocaleString()}</p>
                </div>
                <div className='flex justify-between w-full items-center text-sm font-medium'>
                  <p>Duration</p>
                  <p>31 days</p>
                </div>
                <div className='flex justify-between w-full items-center text-sm font-medium'>
                  <p>Total (31 days)</p>
                  <p>&#8358;{(Number(dailyAmount) * 31).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <Link href="/dashboard/terms" className='flex items-center gap-2'>
                  <p className='text-primary-day font-medium text-sm'>Read Terms & Condition</p>
                  <ChevronRight className='size-4 text-icon-day' />
                </Link>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className='flex gap-3'>
            <Button 
              variant='outline' 
              className='w-full'
              onClick={() => setShowSummary(false)}
            >
              Back
            </Button>
            <Button 
              className='w-full'
              onClick={handleConfirm}
            >
              Confirm Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
