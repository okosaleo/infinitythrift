'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const TRANSFER_OPTIONS = [
  { value: 'wallet_to_thrift_savings', label: 'Wallet → Thrift Savings' },
  { value: 'thrift_savings_to_wallet', label: 'Thrift Savings → Wallet' },
  { value: 'wallet_to_category', label: 'Wallet → Category Savings' },
  { value: 'wallet_to_loan', label: 'Wallet → Loan Repayment' },
];

interface iAppProps {
  userId: string;
  walletBalance: number;
  thriftPlans: Array<{ id: string; category: string; currentAmount: number }>;
}

export default function TransferFunds({ userId, walletBalance, thriftPlans }: iAppProps) {
  const [amount, setAmount] = useState('');
  const [transferType, setTransferType] = useState('');
  const [selectedThrift, setSelectedThrift] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Show the thrift select when the transfer type involves thrift savings
  const showThriftSelect = transferType.includes('thrift_savings');

  const handleTransfer = async () => {
    try {
      setLoading(true);
      // For example, "wallet_to_thrift_savings" becomes ["wallet", "thrift_savings"]
      const [sourceType, destinationType] = transferType.split('_to_');
      
      const response = await fetch('/api/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          sourceType: sourceType.toUpperCase(), // "WALLET" or "THRIFT_SAVINGS"
          destinationType: destinationType.toUpperCase(), // "THRIFT_SAVINGS" or "WALLET"
          thriftId: selectedThrift,
          userId
        })
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Transfer failed');
      
      toast({
        title: "Success!",
        description: `₦${amount} transferred successfully`,
      });
      setAmount('');
      setTransferType('');
      setSelectedThrift('');
    } catch (error: any) {
      toast({
        title: "Transfer Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4 md:w-1/2 w-full">
      <h3 className="text-lg font-semibold">Transfer Funds</h3>
      <div className="space-y-2">
        <Select onValueChange={setTransferType} value={transferType}>
          <SelectTrigger>
            <SelectValue placeholder="Select transfer type" />
          </SelectTrigger>
          <SelectContent>
            {TRANSFER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showThriftSelect && (
          <Select onValueChange={setSelectedThrift} value={selectedThrift}>
            <SelectTrigger>
              <SelectValue placeholder="Select Thrift Plan" />
            </SelectTrigger>
            <SelectContent>
              {thriftPlans?.map((thrift) => (
                <SelectItem key={thrift.id} value={thrift.id}>
                  {thrift.category} (₦{thrift.currentAmount.toString()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <Button 
          onClick={handleTransfer}
          disabled={!amount || !transferType || (showThriftSelect && !selectedThrift) || loading}
          className="w-full"
        >
          {loading ? "Processing..." : "Transfer"}
        </Button>
        
        <p className="text-sm text-muted-foreground">
          {transferType.startsWith('wallet') 
            ? `Available balance: ₦${walletBalance.toLocaleString()}`
            : selectedThrift 
              ? `Thrift balance: ₦${thriftPlans?.find(t => t.id === selectedThrift)?.currentAmount.toString()}`
              : 'Select a thrift plan'}
        </p>
      </div>
    </div>
  );
}
