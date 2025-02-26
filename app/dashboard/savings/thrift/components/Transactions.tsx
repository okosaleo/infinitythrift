"use client";
import { useState } from "react";
import { Check, X, Eye, EllipsisVerticalIcon } from "lucide-react";
import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ThriftSavings, Transaction } from "@prisma/client";

export default function ThriftTransactions({
  thriftSavings,
  transactions
}: {
  thriftSavings: ThriftSavings[];
  transactions: Transaction[];
}) {
  const [selectedThriftId, setSelectedThriftId] = useState<string | null>(null);

  const selectedThrift = thriftSavings.find(t => t.id === selectedThriftId);
  const filteredTransactions = transactions.filter(t => 
    t.destinationType === "THRIFT_SAVINGS" && t.destinationId === selectedThriftId
  );

  const getWeeklyDays = () => {
    if (!selectedThrift) return [];
    
    return selectedThrift.trackers.map(tracker => {
      const weekStart = startOfWeek(tracker.weekStart);
      return Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(weekStart, index);
        const dayStatus = [
          tracker.monday,
          tracker.tuesday,
          tracker.wednesday,
          tracker.thursday,
          tracker.friday,
          tracker.saturday,
          tracker.sunday
        ][index];
        
        const transaction = filteredTransactions.find(t => 
          isSameDay(parseISO(t.createdAt.toString()), date)
        );

        return {
          date,
          status: dayStatus,
          amount: Number(selectedThrift.dailyAmount),
          hasTransaction: !!transaction
        };
      });
    });
  };

  return (
    <div className="flex flex-col gap-2 mt-5">
      {/* Thrift Plan Selection */}
      <div className="grid grid-cols-3 gap-4 p-3">
        {thriftSavings.map((thrift) => (
          <div
            key={thrift.id}
            onClick={() => setSelectedThriftId(thrift.id)}
            className={`cursor-pointer p-4 border rounded-lg ${
              selectedThriftId === thrift.id ? "border-primary-day text-primary-day border-2" : ""
            }`}
          >
            <h3 className="font-medium">{thrift.category}</h3>
            <p>&#8358;{thrift.currentAmount.toString()}</p>
          </div>
        ))}
      </div>

      {/* Transactions List */}
    
      {selectedThrift && (
        <div className="flex flex-col gap-2">
              <div>
      <div className="w-full">
                    <p className="text-2xl font-medium">Month:</p>
                </div>
            </div>
            <div>
              <div className="w-full grid grid-cols-5"> 
                <p></p>
                <p>Status</p>
                <p>Amount(&#8358;)</p>
                <p className="ml-4">Date</p>
                <p></p>
              </div>
        </div>
          {getWeeklyDays().map((week, weekIndex) => (
            <div key={weekIndex}>
              <div className="w-full p-3 bg-[#f7f8f8]">
                <p>Week {weekIndex + 1}</p>
              </div>
              
              <div className=" gap-4 w-full px-4">
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className="grid grid-cols-5 items-center py-2">
                    <div>Day {dayIndex + 1}</div>
                    <div>
                      {day.hasTransaction ? (
                        <Check className="text-positive-day size-5" />
                      ) : (
                        <X className="text-negative-day size-5" />
                      )}
                    </div>
                    <div>&#8358;{day.amount.toLocaleString()}</div>
                    <div>{format(day.date, "dd/MM/yyyy")}</div>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                         <EllipsisVerticalIcon className="size-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <div className="flex gap-3">
                          <Eye className="size-4 text-icon-day" />
                           <p>View Details</p> 
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}