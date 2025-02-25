import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronRight, Plus, PlusIcon, Settings } from "lucide-react"
import Link from "next/link"


const cycles = [
    {
        id: 1,
        cat: "Category 1",
        lead: "View Leaderboard",
        tot: "0",
        in: "0",
        duration: "3 months",
        amount: "20,000 - 50,000",
        interest: "5%",
    },
    {
        id: 2,
        cat: "Category 2",
        lead: "View Leaderboard",
        tot: "0",
        in: "0",
        duration: "6 months",
        amount: "50,000 - 200,000",
        interest: "10%",
    },
    {
        id: 3,
        cat: "Category 3",
        tot: "0",
        in: "0",
        duration: "9 months",
        lead: "View Leaderboard",
        amount: "200,000 - 1,000,000",
        interest: "15%",
    },
]
export default function page() {
  return (
    <div className="flex flex-col gap-2">
        <Dialog>
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
                <h1 className="md:text-2xl text-xl font-semi-bold text-content-day">Structured Savings</h1>
                <DialogTrigger>
                <button className=' p-2 flex items-center bg-primary-active gap-1 rounded-md'>
                    <Plus className='size-4 text-text-button' />
                    <p className='md:text-sm text-[12px] text-text-button'>Create Savings</p>
                </button>
                </DialogTrigger>
                <DialogContent className="border-0 shadow-md h-fit">
                    <DialogHeader className="flex items-center justify-center">
                        <DialogTitle>Create Savings</DialogTitle>
                    </DialogHeader>
                    <form>
                    <div className="mt-5 text-content2-day flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label>Savings Category</Label>
                            <DropdownMenu>
                            <DropdownMenuTrigger>
                            <div className="flex focus-visible:ring-1 items-center rounded-md border border-outline-day px-2">
                                <Input className="border-0 focus-visible:ring-0" />
                                <ChevronDown />
                            </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='border-0 w-[30vw] mr-3'>
                                <DropdownMenuItem className="flex flex-col gap-2 items-start text-content2-day">
                                    <p>Bronze</p>
                                    <p> ₦1000-5000</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                                
                            </DropdownMenu>
                        </div>
                        <div>
                            <div>
                                <Label className="text-content2-day">Amount (₦)</Label>
                                <Input />
                            </div>
                        </div>
                        <div>
                        <div>
                                <Label className="text-content2-day">Recepient</Label>
                                <Input />
                            </div>
                        </div>
                        <div>
                            <div>
                                <Label>Description</Label>
                                <Textarea />
                            </div>
                        </div>
                    </div>
                    
                        <Button className="w-full mt-3">Create</Button>
                </form>
                </DialogContent>
            </div>
        </Dialog>
        
        {/*CATEGORIES*/}
        <div className=" w-full md:p-7 p-2  gap-1">
            <Dialog>
            <div className="flex flex-col gap-5 border-r-[1px] border-r-outline-day items-start justify-start lg:p-2 p-0 lg:w-1/2 w-full">
            <Link href="/admin/dashboard/settings" className="w-full flex gap-2 items-center justify-end">
            <Settings className="text-primary-active" />
            <p className="text-sm text-primary-active">Go to Settings</p>
            </Link>
                {cycles.map((item) => (
                     <Card key={item.id} className="border-none shadow-md p-1 w-full ">
                     <CardHeader className="border-b-[1px] flex items-center flex-row justify-between border-outline-day font-medium text-base">
                        <CardTitle>
                        {item.cat}
                        </CardTitle> 
                        <DialogTrigger>
                        <CardTitle className="text-sm text-primary-day font-light">
                        {item.lead}
                        </CardTitle>  
                        </DialogTrigger>   
                     </CardHeader>
                     <CardContent className="flex items-center">
                        <div className="flex flex-col w-[98%] mt-3">
                            <div className="md:w-[70%] w-full grid grid-cols-3 border-b-[1px] border-b-outline-day py-3">
                                <div className=" gap-9 items-center text-[12px] text-content2-day w-full">
                                    <p> Total Savings</p>
                                    <p>&#8358;{item.tot}</p>
                                    
                                </div>
                                <div className="w-full gap-9 items-start text-[12px] text-content-day">
                                <p>Total Interest</p>
                                <p>&#8358;{item.in}</p>
                                </div>
                                <div className="w-full gap-9 items-start text-[12px] text-content-day">
                                <p>Members</p>
                                <p>0</p>
                                </div>
                            </div>
                            <div className="text-[12px] mt-3 text-content2-day grid grid-cols-2 gap-2 md:w-[30%] w-[50%]">
                                <div className="w-full">
                                <p>Duration</p>
                                <p className="font-bold">{item.duration}</p>
                                </div>
                                <div className="w-full">
                                <p>Interest</p>
                                <p className="font-bold">{item.interest}</p>
                                </div>
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
            <DialogContent className="border-[0.6px] border-primary-day">
                <DialogHeader className="flex justify-center items-center">
                    <DialogTitle>Leaderboard</DialogTitle>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}
