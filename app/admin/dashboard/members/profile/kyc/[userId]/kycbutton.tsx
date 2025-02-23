// components/kyc-button.tsx
"use client"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

interface KYCButtonProps {
  userId: string
}

export default function KYCButton({ userId }: KYCButtonProps) {
  const [showRejectionReason, setShowRejectionReason] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const { toast } = useToast()

  const handleAction = async (status: 'APPROVED' | 'REJECTED', data?: any) => {
    try {
      const response = await fetch('/api/kyc/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          status,
          rejectionReason: status === 'REJECTED' ? data.rejectionReason : null
        })
      })

      if (!response.ok) throw new Error('Action failed')
      
      // Reset form on success
      reset()
      setShowRejectionReason(false)
      toast({
        title: 'KYC status set',
        description: "You Just set a user KYC status!"
      })
    } catch (error) {
      console.error('KYC update error:', error)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <Button onClick={() => handleAction('APPROVED')}>
          Approve
        </Button>
        
        <Button 
          variant="destructive"
          onClick={() => setShowRejectionReason(!showRejectionReason)}
        >
          Reject
        </Button>
      </div>

      {showRejectionReason && (
        <form 
          onSubmit={handleSubmit((data) => handleAction('REJECTED', data))}
          className="flex gap-2"
        >
          <Input
            {...register('rejectionReason', { required: true })}
            placeholder="Enter rejection reason"
            className="flex-1"
          />
          <Button type="submit" variant="destructive">
            Confirm Rejection
          </Button>
        </form>
      )}
    </div>
  )
}