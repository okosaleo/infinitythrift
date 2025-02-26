"use client"
import { Button } from "@/components/ui/button"
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySavingsSchema, CategorySavingsFormData } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"
// ... other imports

const cycles = [
    {
        id: 1,
        name: "Category 1",
        cat: "THREE_MONTHS",
        duration: "3 months",
        amount: "20,000 - 50,000",
        minAmount: 20000,
        maxAmount: 50000,
        interest: "5%",
    },
    {
      id: 2,
      name: "Category 2",
      cat: "SIX_MONTHS",
      duration: "6 months",
      amount: "50,000 - 200,000",
      minAmount: 50000,
      maxAmount: 200000,
      interest: "10%",
  },
  {
      id: 3,
      name: "Category 3",
      cat: "NINE_MONTHS",
      duration: "9 months",
      amount: "200,000 - 1,000,000",
      minAmount: 200000,
      maxAmount: 1000000,
      interest: "15%",
  },
];

export default function CategoryPage() {
  const { toast } = useToast();
  const [selectedCycle, setSelectedCycle] = useState<typeof cycles[number] | null>(null);

  const form = useForm<CategorySavingsFormData>({
    resolver: zodResolver(categorySavingsSchema),
  });

  const { data: countsData } = useSWR('/api/savings/counts', 
    url => fetch(url).then(res => res.json()),
    { refreshInterval: 300000 } 
  )

  const getMemberCount = (category: string) => {
    return countsData?.find((c: any) => c.category === category)?._count?._all || 0;
  };

  const handleSubmit = async (data: CategorySavingsFormData) => {
    try {
      if (!selectedCycle) {
        toast({
          title: "Error",
          description: "Please select a savings category first",
          variant: "destructive"
        });
        return;
      }
  
      // Convert amount to number
      const amount = Number(data.amount);
      
      // Validate amount against selected category
      if (amount < selectedCycle.minAmount || amount > selectedCycle.maxAmount) {
        toast({
          title: "Invalid Amount",
          description: `Amount must be between ₦${selectedCycle.minAmount.toLocaleString()} and ₦${selectedCycle.maxAmount.toLocaleString()} for this category`,
          variant: "destructive"
        });
        return;
      }
  
      // Proceed with API call
      const response = await fetch('/api/savings/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          category: selectedCycle.cat,
          amount: amount // Ensure number type
        }),
      });
  
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to create savings');
      
      toast({ title: "Success!", description: "Category savings created" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create savings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
     <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center px-7">
                <h1 className="text-2xl font-semi-bold text-content-day">Categories/Cycles</h1>
            </div>
      <div className="w-full md:p-7 p-2 gap-1">
      <div className="flex flex-col gap-5 border-r-[1px] border-r-outline-day items-start justify-start lg:p-2 p-0 lg:w-1/2 w-full">
        {cycles.map((item) => (
          <Card key={item.id} className="border-none shadow-md md:w-3/4 w-full">
            <Dialog>
              <CardHeader className="border-b-[1px] border-outline-day font-medium text-base">
                <CardTitle>
                {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
              <div className="flex flex-col w-[98%] mt-3">
                            <div className="w-full flex flex-col gap-1 border-b-[1px] border-b-outline-day py-3">
                                <div className="flex flex-row gap-12 items-center text-sm text-content2-day">
                                    <p>Duration</p>
                                    <p>Amount(&#8358;)</p>
                                    <p>Interest(%)</p>
                                </div>
                                <div className="flex flex-row gap-12 items-start text-[12px] text-content-day">
                                    <p>{item.duration}</p>
                                    <p>&#8358;{item.amount}</p>
                                    <p>{item.interest}</p>
                                </div>
                            </div>
                            <div className="text-[12px] mt-3 text-content2-day">
                                <p>Members({getMemberCount(item.cat)})</p>
                                </div> 
                                <DialogTrigger asChild>
                <Button  onClick={() => setSelectedCycle(item)} className="w-1/2 mt-3">
                  <PlusIcon className="size-4 text-text-button"/>
                  <p>Join Savings</p>
                </Button>
              </DialogTrigger>
                        </div>
                        <div>
                            <ChevronRight className="size-4 text-content2-day" />
                        </div>
              </CardContent>
              <DialogContent className="border-primary-day">
                <DialogHeader>
                  <DialogTitle>Enter Saving Details</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Amount (₦)</Label>
                      <Input 
                        type="number"
                        placeholder="e.g 4,000,000"
                        {...form.register("amount", { valueAsNumber: true })}
                      />
                      {selectedCycle && (
                           <p className="text-xs text-content2-day">
                    {`This category requires between ₦${selectedCycle.minAmount.toLocaleString()} 
                   and ₦${selectedCycle.maxAmount.toLocaleString()}`}
                      </p>)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Add note"
                        {...form.register("description")}
                      />
                    </div>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Processing..." : "Proceed"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        ))}
        </div>
      </div>
    </div>
  );
}
