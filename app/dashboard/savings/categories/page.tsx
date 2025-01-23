import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, PlusIcon } from "lucide-react"


const cycles = [
    {
        id: 1,
        cat: "Category 1",
        duration: "3 months",
        amount: "20,000 - 50,000",
        interest: "5%",
    },
    {
        id: 2,
        cat: "Category 2",
        duration: "6 months",
        amount: "50,000 - 200,000",
        interest: "10%",
    },
    {
        id: 3,
        cat: "Category 3",
        duration: "9 months",
        amount: "200,000 - 1,000,000",
        interest: "15%",
    },
]
export default function page() {
  return (
    <div className="flex flex-col gap-2">
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center px-7">
                <h1 className="text-2xl font-semi-bold text-content-day">Categories/Cycles</h1>
            </div>
        {/*CATEGORIES*/}
        <div className=" w-full md:p-7 p-2  gap-1">
            <div className="flex flex-col gap-5 border-r-[1px] border-r-outline-day items-start justify-start lg:p-2 p-0 lg:w-1/2 w-full">
                {cycles.map((item) => (
                     <Card key={item.id} className="border-none shadow-md p-1 w-full ">
                     <CardHeader className="border-b-[1px] border-outline-day font-medium text-base">
                        <CardTitle>
                        {item.cat}
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
                                <p>Members(28)</p>
                                </div> 
                        </div>
                        <div>
                            <ChevronRight className="size-4 text-content2-day" />
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button>
                            <PlusIcon className="size-4 text-text-button"/>
                            <p>Join Savings</p>
                        </Button>
                     </CardFooter>
                 </Card>
                ))}
            </div>
        </div>
    </div>
  )
}
