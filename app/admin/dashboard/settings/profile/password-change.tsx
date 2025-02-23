"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8)
  });
  
  type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function Passwordchange() {
    const { 
        register, 
        handleSubmit,
        formState: { errors }
      } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema)
      });
    
      const onSubmit = async (data: PasswordFormValues) => {
        try {
          const response = await fetch('/api/profile/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          // Handle response
        } catch (error) {
          console.error("Password change error:", error);
        }
      };
  return (
    <div className="w-full p-7">
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="flex items-center gap-2">
    <div className="w-full p-7 bg-[#f7f8f8] flex flex-col gap-10 lg:h-[40vh] h-fit rounded-sm">
    <div className="flex flex-col gap-3">
             <h2 className="text-xl font-medium">Account Settings</h2>
             <p className="text-[12px] text-content2-day ">Change account settings like password etc.</p>
         </div>
  <div className="w-2/5">
    <Label>Current Password</Label>
    <Input   type="password" 
          {...register('currentPassword')} />
           {errors.currentPassword && (
          <p className="text-destructive text-sm">{errors.currentPassword.message}</p>
        )}
  </div>
  <div className="w-2/5">
    <Label>New Password</Label>
    <Input  type="password" 
          {...register('newPassword')} />
           {errors.newPassword && (
          <p className="text-destructive text-sm">{errors.newPassword.message}</p>
        )}
  </div>
  <Button type="submit" className="mt-6">Change Password</Button>
    </div>
    </form>
 </div>
  )
}
