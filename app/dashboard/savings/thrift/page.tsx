import { DatePickerDemo } from "@/components/DateSelect";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArchiveRestore, Calendar, Download, EllipsisVertical, EllipsisVerticalIcon, ListFilter, Plus, Search } from "lucide-react";


export default function ThriftPage() {
  return (
    <div className="flex flex-col gap-2">
        {/* Heading */}
        <div>
            <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center px-7">
                <h1 className="text-2xl font-semi-bold text-content-day">Thrift Savings</h1>
            </div>
            <div className="border-b-[1px] border-b-outline-day h-7 w-full flex items-center px-7">
                <p className="text-sm text-content-day font-normal">Savings / Thrift Savings</p>
            </div>
        </div>
         {/* Box */}
         <div className="px-5 flex lg:flex-row flex-col justify-between">
            <div className="flex lg:flex-row flex-col gap-4 w-full">
            <div className="lg:w-2/5 w-full border-[1px] hover:border-content-day border-outline-day flex flex-col gap-1 rounded-md shadow-md mt-20 px-4 py-3">
                <div className="flex justify-between">
                    <p className="text-sm text-content-day ">October</p>
                    <EllipsisVerticalIcon className="size-7 text-content-day cursor-pointer" />
                </div>
                <div><p className="text-xl text-content-day font-bold">&#8358;24,000.00</p></div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-content-day">My Interets</p>
                    <p className="text-positive-day font-bold">&#8358;4,000.00</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-content-day">Progress</p>
                    <p className="text-primary-day font-bold">9.7%</p>
                </div>
                <div className="w-full flex gap-2">
                    <Button className="flex items-center flex-row gap-2 w-1/2">
                        <Plus className="size-5 text-text-button" />
                        <p className="text-[13px] text-text-button">Save Money</p>
                    </Button>
                    <Button className="bg-text-button hover:bg-active-nav border-outline-day border-[1.3px] flex items-center flex-row gap-2 w-1/2">
                        <ArchiveRestore className="size-5 text-content-day" />
                        <p className="text-[13px] text-content-day">Withdraw</p>
                    </Button>
                </div>
            </div>
            <div className="lg:w-2/5 w-full border-[1px] hover:border-content-day border-outline-day flex flex-col gap-1 rounded-md shadow-md mt-20 px-4 py-3">
                <div className="flex justify-between">
                    <p className="text-sm text-content-day ">October</p>
                    <EllipsisVerticalIcon className="size-7 text-content-day cursor-pointer" />
                </div>
                <div><p className="text-xl text-content-day font-bold">&#8358;4,000,000.00</p></div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-content-day">My Interets</p>
                    <p className="text-positive-day font-bold">&#8358;1,270,000.00</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-content-day">Progress</p>
                    <p className="text-primary-day font-bold">2.7%</p>
                </div>
                <div className="w-full flex gap-2">
                    <Button className="flex items-center flex-row gap-2 w-1/2">
                        <Plus className="size-5 text-text-button" />
                        <p className="text-[13px] text-text-button">Save Money</p>
                    </Button>
                    <Button className="bg-text-button hover:bg-active-nav border-outline-day border-[1.3px] flex items-center flex-row gap-2 w-1/2">
                        <ArchiveRestore className="size-5 text-content-day" />
                        <p className="text-[13px] text-content-day">Withdraw</p>
                    </Button>
                </div>
            </div>
            </div>
            <div className="flex justify-start items-start w-1/5 mt-10">
                <DatePickerDemo />
            </div>
         </div>
         {/* Transsactions */}
         <div className="flex flex-col gap-2 mt-5">
            <div className="flex justify-end w-full">
                <div className="flex gap-3 flex-row p-2 items-center">
                    <Search className="size-6 text-icon-day" />
                    <ListFilter className="size-6 text-content-day" />
                    <Button>
                        <Download />
                        <p>Download</p>
                    </Button>
                </div>
            </div>
            {/* main*/}
            <div></div>
         </div>
    </div>
  )
}
