
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { prisma } from "@/lib/prisma"
import { ChevronRight, Plus, Settings } from "lucide-react"
import Link from "next/link"

const getThriftData = async () => {
  return await prisma.thriftSavings.groupBy({
    by: ['category'],
    _sum: {
      currentAmount: true
    },
    _count: {
      userId: true
    }
  })
}

const categoryConfig = {
  BRONZE: {
    duration: "3 months",
    range: "1,000 - 5,000",
    charge: "Fixed"
  },
  SILVER: {
    duration: "3 months",
    range: "6,000 - 20,000", 
    charge: "Fixed"
  },
  GOLD: {
    duration: "3 months",
    range: "21,000 - 50,000",
    charge: "Fixed"
  },
  INFINITY: {
    duration: "3 months", 
    range: "51,000 - infinity",
    charge: "Fixed"
  }
}

export default async function Thriftpage() {
  const thriftData = await getThriftData()
  
  const savings = Object.entries(categoryConfig).map(([category, config]) => {
    const data = thriftData.find(d => d.category === category)
    
    return {
      id: category,
      cat: category.charAt(0) + category.slice(1).toLowerCase(),
      tot: "Total Contribution",
      in: data?._sum.currentAmount?.toNumber()?.toLocaleString() || "0",
      duration: config.duration,
      range: config.range,
      members: data?._count.userId || 0
    }
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Dialog and other JSX remains the same */}
      <Dialog>
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
                <h1 className="md:text-2xl text-xl font-semi-bold text-content-day">Thrift Savings</h1>
                <DialogTrigger asChild className="border-0">
                <button className='p-2 flex items-center bg-primary-active gap-2 rounded-md'>
                    <Plus className='size-4 text-text-button' />
                   
                    <p className='text-sm text-text-button'>Create Contribution</p>
                </button>
                </DialogTrigger>
                <DialogContent className="border-0 shadow-md h-fit">
  <DialogHeader className="flex items-center justify-center">
    <DialogTitle>Create Thrift Contribution</DialogTitle>
  </DialogHeader>
  
</DialogContent>
            </div>
            </Dialog>
      {/* Categories */}
      <div className="w-full md:p-7 p-2 gap-1">
        <div className="flex flex-col gap-5 border-r-[1px] border-r-outline-day items-start justify-start lg:p-2 p-0 lg:w-1/2 w-full">
          <Link href="/admin/dashboard/settings" className="w-full flex gap-2 items-center justify-end">
            <Settings className="text-primary-active" />
            <p className="text-sm text-primary-active">Go to Settings</p>
          </Link>
          
          {savings.map((item) => (
            <Card key={item.id} className="border-none shadow-md p-1 w-full">
              <CardHeader className="border-b-[1px] flex items-center flex-row justify-between border-outline-day font-medium text-base">
                <CardTitle>{item.cat}</CardTitle>   
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="flex flex-col w-[98%] mt-3">
                  <div className="md:w-[70%] w-full grid grid-cols-2 border-b-[1px] border-b-outline-day py-3">
                    <div className="gap-9 items-center text-[12px] text-content2-day w-full">
                      <p>{item.tot}</p>
                      <p>₦{item.in}</p>
                    </div>
                    <div className="w-full gap-9 items-start text-[12px] text-content-day">
                      <p>Members</p>
                      <p>{item.members}</p>
                    </div>
                  </div>
                  <div className="text-[12px] mt-3 text-content2-day grid grid-cols-3 gap-2 md:w-[80%] w-full">
                    <div className="w-full">
                      <p>Duration</p>
                      <p className="font-bold">{item.duration}</p>
                    </div>
                    <div className="w-full">
                      <p>Range</p>
                      <p className="font-bold">{item.range}</p>
                    </div>
                    <div className="w-full">
                      <p>Charge</p>
                      <p className="font-bold">{categoryConfig[item.id.toUpperCase() as keyof typeof categoryConfig].charge}</p>
                    </div>
                  </div> 
                </div>
                <div>
                  <ChevronRight className="size-4 text-content2-day" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
