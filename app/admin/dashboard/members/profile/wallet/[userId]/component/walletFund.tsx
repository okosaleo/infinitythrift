// components/wallet-fund.tsx
"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const fundSchema = z.object({
  amount: z.number().positive(),
  fundingType: z.enum(["REFERRAL", "FUNDWALLET", "SAVINGS_RETURN"]),
});

type FundFormValues = z.infer<typeof fundSchema>;

interface WalletFundProps {
  userId: string | undefined // Changed to required string
}

export default function WalletFund({ userId }: WalletFundProps) {
    const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: {isSubmitting, errors },
  } = useForm<FundFormValues>({
    resolver: zodResolver(fundSchema),
  });

  const onSubmit = async (data: FundFormValues) => {
    try {
      const response = await fetch("/api/wallet/fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId // Include the user ID in the request body
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Funding failed");
      }

      // Handle success (e.g., show toast, refresh data)
      toast({
        title: "Wallet funded successfully!",
        description: "You have funded a users wallet!"
    });
      
    } catch (error) {
      console.error("Funding error:", error);
      alert(error instanceof Error ? error.message : "Funding failed");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col">
          <div className="flex flex-col gap-2">
            <Label>Funding Type</Label>
            <select
              {...register("fundingType")}
              className="p-2 border rounded-md bg-background"
            >
              <option value="REFERRAL">Referral Reward</option>
              <option value="FUNDWALLET">Fund Wallet</option>
              <option value="SAVINGS_RETURN">Savings Return</option>
            </select>
            {errors.fundingType && (
              <span className="text-destructive text-sm">
                {errors.fundingType.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Amount (₦)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Enter amount"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <span className="text-destructive text-sm">
                {errors.amount.message}
              </span>
            )}
          </div>
          { isSubmitting ? (
            <Button className="w-full mt-4 flex gap-2">
                <p>Please Wait</p>
                <Loader2 className="size-4 animate-spin" />
            </Button>
          ) :
          <Button type="submit" className="w-full mt-4">
            Fund Wallet
          </Button>}
        </form>
      </div>
    </div>
  );
}
