// app/deposit/page.jsx (or pages/deposit.js if using the pages directory)
'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { withdrawalSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from 'react';
import { useForm } from "react-hook-form";
const PaystackConsumer = dynamic(
  () => import('react-paystack').then((mod) => mod.PaystackConsumer),
  { ssr: false }
);
import { z } from "zod";

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

const DepositPage = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();
  // Convert deposit amount (in Naira) to the lowest currency unit (Kobo).
  const depositAmount = parseInt(amount, 10) * 100;

  // Configure Paystack parameters.
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: depositAmount,
    publicKey: 'pk_test_1e4c54a2aeb0beb74783089c92cdcd8f51b97689', // replace with your actual public key
  };

  const handleSuccess = async (reference: any) => {
    try {
      const response = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: reference.reference, // Ensure reference is passed correctly
          amount: parseInt(amount, 10), // Make sure amount is a number
        }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
  
      toast({
        title: "Deposit Successful!",
        description: "Your wallet has been updated with the deposited funds.",
      });
    } catch (error) {
      console.error('Deposit error:', error);
      toast({
        title: "Deposit Failed",
        description: "There was an error depositing funds in your wallet.",
        variant: "destructive"
      });
    }
  };
  
  // Called if the Paystack dialog is closed.
  const handleClose = () => {
    console.log('Payment closed.');
  };

  const {
    register,
    handleSubmit,
    formState: {isSubmitting, errors},
  } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
  });

  const onSubmit = async (data: WithdrawalFormData) => {
    try {
      const response = await fetch("/api/withdrawal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Submission error:", result.error);
        toast({
          title: "Withdrawal Failed",
          description: result.error || "Something went wrong while submitting your withdrawal request.",
          variant: "destructive"
        });
      } else {
        console.log("Withdrawal request submitted successfully:", result);
        toast({
          title: "Withdrawal Request Submitted",
          description: "Your withdrawal request has been submitted successfully.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Withdrawal Error",
        description: "An error occurred while submitting your withdrawal request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-content-day font-medium text-2xl mb-5">Deposit Funds</h1>
      <Dialog>
        <p className="text-content-day text-sm mb-1">Deposit with Paystack:</p>
        <DialogTrigger className="w-1/2">
          <button
            className="bg-active-nav flex items-center justify-center w-full p-2 border border-primary-day rounded-md">
              <Image src="/img/paystack.png" alt="Paystack Image" width={90} height={30} />
          </button>
        </DialogTrigger>
      
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Deposit Funds</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label>Your Email</Label>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label>Deposit Amount</Label>
              <Input
                type="number"
                placeholder="Amount to deposit (NGN)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <br />
          {typeof window !== 'undefined' && (
  <PaystackConsumer {...config} onSuccess={handleSuccess} onClose={handleClose}>
    {({ initializePayment }) => (
      <button 
        className="w-full bg-primary-day text-text-button rounded-md p-2" 
        onClick={() => initializePayment(
          handleSuccess,
          handleClose
        )}
      >
        Deposit
      </button>
    )}
    </PaystackConsumer>
)}
        </DialogContent>
      </Dialog>
      
      <div className="mt-16 w-full">
  
    <Dialog>
      <h1 className="mb-6 text-2xl text-content-day font-medium">Withdraw Funds</h1>
      <p className="text-[13px] text-content-day mb-2">Send Withdrawal Request:</p>
      <DialogTrigger className="w-1/2">
        <Button className="w-full">Withdraw Funds</Button>
      </DialogTrigger>
      <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Withdraw Funds</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 bg-active-nav w-full p-1 items-center">
            <div>
              <InfoIcon className="size-6 text-icon-day" />
            </div>
            <p className="text-[12px] text-content2-day">
              Name on bank account must match the name on your membership profile to process withdrawals. Contact support in case of any issue.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Amount (NGN)</Label>
            <Input
              type="text"
              placeholder="e.g. 3,000,000"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-destructive text-xs">{errors.amount.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Bank</Label>
            <Input 
              type="text"
              placeholder="Select Bank"
              {...register("bankName")}
            />
            {errors.bankName && (
              <p className="text-destructive text-xs">{errors.bankName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Account Number</Label>
            <Input 
              type="text"
              placeholder="Enter Account Number"
              {...register("accountNumber")}
            />
            {errors.accountNumber && (
              <p className="text-destructive text-xs">{errors.accountNumber.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Add Note"
              {...register("note")}
            />
            {errors.note && (
              <p className="text-destructive text-xs">{errors.note.message}</p>
            )}
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className=" w-full text-text-button py-2 px-4 rounded">
          {isSubmitting ? "Submitting..." : "Withdraw"}
        </Button>
        </form>
      </DialogContent>
    </Dialog>
  
</div>

    </div>
  );
};

export default DepositPage;


