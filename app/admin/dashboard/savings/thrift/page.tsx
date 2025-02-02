
import { Plus } from "lucide-react"


const savings = [
    {
        id: 1,
        cat: "Bronze",
        tot: "Total Contribution",
        in: "3,466,000",
        duration: "3 months",
        range: "1,000 - 5,000",
    },
    {
        id: 2,
        cat: "Silver",
        tot: "Total Contribution",
        in: "3,466,000",
        duration: "3 months",
        range: "6,000 - 20,000",
    },
    {
        id: 3,
        cat: "Gold",
        tot: "Total Contribution",
        in: "3,466,000",
        duration: "3 months",
        range: "21,000 - 50,000",
    },
    {
        id: 4,
        cat: "Infinity",
        tot: "Total Contribution",
        in: "3,466,000",
        duration: "3 months",
        range: "51,000 - ",
    },
]
export default function Thriftpage() {
  return (
    <div className="flex flex-col gap-2">
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
                <h1 className="md:text-2xl text-xl font-semi-bold text-content-day">Structured Savings</h1>
                <button className='p-2 flex items-center bg-primary-active gap-2 rounded-md'>
                    <Plus className='size-4 text-text-button' />
                    <p className='text-sm text-text-button'>Create Contribution</p>
                </button>
            </div>
        {/*CATEGORIES*/}
        <div className=" w-full md:p-7 p-2  gap-1">
            <div className="flex flex-col gap-5 border-r-[1px] border-r-outline-day items-start justify-start lg:p-2 p-0 lg:w-1/2 w-full">
               
            </div>
        </div>
    </div>
  )
}
