"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowDownUp,
  ArrowUpDown,
  Banknote,
  Clock,
  HandCoins,
  HandCoinsIcon,
  WalletMinimalIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Transaction } from "@prisma/client";

// Define a type that includes relations
type TransactionWithRelations = Transaction & {
  withdrawalRequest?: {
    bankName: string;
  };
  loan?: {
    product?: {
      type: string;
    };
  };
  categorySavings?: {
    category: string;
  };
};

export default function Transactions({ transactions }: { transactions: TransactionWithRelations[] }) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | Transaction['type']>('all');

  // Optimize filtering using useMemo
  const filteredTransactions = useMemo(() => 
    transactions.filter(transaction => 
      selectedFilter === 'all' ? true : transaction.type === selectedFilter
    ), [transactions, selectedFilter]
  );

  const getTransactionDetails = (transaction: TransactionWithRelations) => {
    const base = {
      icon: <ArrowDownUp className="size-5" />, 
      title: 'Transaction',
      amount: `₦${Number(transaction.amount).toLocaleString()}`,
      date: new Date(transaction.createdAt).toLocaleDateString(),
    };

    switch(transaction.type) {
      case 'DEPOSIT':
        return {
          ...base,
          icon: <WalletMinimalIcon className="size-5 text-green-500" />, 
          title: 'Deposit',
          description: 'Funds added to wallet',
        };
      case 'WITHDRAWAL':
        return {
          ...base,
          icon: <ArrowUpDown className="size-5 text-red-500" />, 
          title: 'Withdrawal',
          description: `Withdrawal to ${transaction.withdrawalRequest?.bankName || 'bank'}`,
        };
      case 'LOAN_DISBURSEMENT':
        return {
          ...base,
          icon: <Banknote className="size-5 text-blue-500" />, 
          title: 'Loan Received',
          description: `Loan disbursement (${transaction.loan?.product?.type || 'loan'})`,
        };
      case 'LOAN_REPAYMENT':
        return {
          ...base,
          icon: <Banknote className="size-5 text-purple-500" />, 
          title: 'Loan Repayment',
          description: `Repayment for ${transaction.loan?.product?.type || 'loan'}`,
        };
      case 'SAVINGS_DEPOSIT':
        return {
          ...base,
          icon: <HandCoinsIcon className="size-5 text-emerald-500" />, 
          title: 'Savings Deposit',
          description: transaction.categorySavings 
            ? `${transaction.categorySavings.category} Savings`
            : 'Savings deposit',
        };
      case 'SAVINGS_WITHDRAWAL':
        return {
          ...base,
          icon: <HandCoins className="size-5 text-orange-500" />, 
          title: 'Savings Withdrawal',
          description: 'Savings withdrawal',
        };
      default:
        return {
          ...base,
          icon: <Clock className="size-5 text-gray-500" />, 
          description: 'Pending transaction',
        };
    }
  };

  return (
    <div className="space-y-4 px-2 sm:px-0"> 
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2"> 
        {['all', 'DEPOSIT', 'WITHDRAWAL', 'LOAN_DISBURSEMENT', 'LOAN_REPAYMENT', 'SAVINGS_DEPOSIT', 'SAVINGS_WITHDRAWAL'].map((filter) => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            onClick={() => setSelectedFilter(filter as typeof selectedFilter)}
            className={cn(
              'whitespace-nowrap text-xs sm:text-sm',
              selectedFilter === filter && 'bg-active-nav border-primary-day'
            )}
          >
            {filter.toLowerCase().replace(/_/g, ' ')}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => {
          const details = getTransactionDetails(transaction);
          
          return (
            <div 
              key={transaction.id}
              className="flex items-start gap-3 p-3 bg-background-day rounded-lg shadow-sm sm:items-center"
            >
              <div className={cn(
                  'p-1.5 rounded-md',
                  transaction.type === 'WITHDRAWAL' || transaction.type === 'SAVINGS_WITHDRAWAL'
                    ? 'bg-destructive/20'
                    : 'bg-[#D8FFD7]'
                )}>
                {details.icon}
              </div>

              <div className="flex-1 min-w-0"> 
                <div className="flex justify-between items-start gap-2 sm:items-center">
                  <h3 className="text-sm font-medium text-content-day truncate">{details.title}</h3>
                  <span className="text-xs text-content2-day flex-shrink-0">
                    {details.date}
                  </span>
                </div>
                <p className="text-xs text-content2-day truncate">{details.description}</p>
              </div>

              <div className="flex-shrink-0 text-right ml-2">
                <p className={cn(
                  'text-sm font-medium',
                  transaction.type === 'WITHDRAWAL' || transaction.type === 'LOAN_REPAYMENT'
                    ? 'text-red-500'
                    : 'text-green-500'
                )}>
                  {transaction.type === 'WITHDRAWAL' || transaction.type === 'LOAN_REPAYMENT' 
                    ? `-${details.amount}`
                    : `+${details.amount}`}
                </p>
                <p className="text-[0.7rem] text-content2-day capitalize">
                  {transaction.status.toLowerCase()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}