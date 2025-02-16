
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArchiveRestore, Download,  EllipsisVerticalIcon, ListFilter, Plus, Search } from "lucide-react";
import Thrift from "./Thrift";


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
                    <p className="text-sm text-content-day ">Thrift Plan</p>
                    <EllipsisVerticalIcon className="size-7 text-content-day cursor-pointer" />
                </div>
                <div><p className="text-xl text-content-day font-bold">&#8358;0</p></div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-content-day">My Interets</p>
                    <p className="text-positive-day font-bold">&#8358;0</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-content-day">Progress</p>
                    <p className="text-primary-day font-bold">0</p>
                </div>
                <Dialog>
                <div className="w-full flex gap-2">
                    <DialogTrigger className="w-full">
                    <Button className="flex items-center flex-row gap-2 w-full">
                        <Plus className="size-5 text-text-button" />
                        <p className="text-[13px] text-text-button">Save Money</p>
                    </Button>
                    </DialogTrigger>
                    <Button className="bg-text-button hover:bg-active-nav border-outline-day border-[1.3px] flex items-center flex-row gap-2 w-full">
                        <ArchiveRestore className="size-5 text-content-day" />
                        <p className="text-[13px] text-content-day">Withdraw</p>
                    </Button>
                </div>
                <DialogContent className="border-primary-day">
                    <DialogHeader className="flex items-center justify-center">
                        <DialogTitle>Enter Savings Details</DialogTitle>
                    </DialogHeader>
                    <Thrift />
                </DialogContent>
                </Dialog>
            </div>
            </div>
            <div className="flex justify-start items-start w-1/5 mt-10">
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
