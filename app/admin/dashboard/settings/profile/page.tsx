
import PhoneNumberInput from "@/app/dashboard/settings/profile/components/Phone";
import { Button } from "@/components/ui/button";
import { Dialog,  DialogContent,  DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DoorOpen, EllipsisVertical, SquarePen, } from "lucide-react";
import Link from "next/link";
import Passwordchange from "./password-change";


export default function Profilepage() {
  return (
    <div className="flex flex-col ">
         <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
            <Link href="/admin/dashboard/settings" ><ArrowLeft className="size-4 text-content-day" /></Link>
            <h1 className="text-2xl font-semi-bold text-content-day">Profile</h1>
       </div>
       <div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
            <h1 className="text-base font-semi-bold text-content-day font-light">Settings/profile</h1>
       </div>

       <div className="w-full p-7">
        <div className="w-full p-7 bg-[#f7f8f8] flex flex-col gap-10 lg:h-[80vh] h-fit rounded-sm">
        {/* first part*/}
        <Dialog>
        <div className="flex justify-between">
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-medium">Profile</h2>
                <p className="text-[12px] ">Add and edit your personal profile</p>
            </div>
            <DropdownMenu >
            <DropdownMenuTrigger className="border-0">
            <div className="rounded-full h-10 w-10 bg-[#efefef] flex items-center justify-center">
                <EllipsisVertical className="size-4" />
            </div>
            <DropdownMenuContent className='border-0 w-36 mr-3'>
              <DialogTrigger>
                        <DropdownMenuItem>
                          <div className='flex flex-row gap-2 items-center'>
                            <SquarePen className="text-icon-day size-4" />
                            <button>Edit Profile</button>
                          </div>
                        </DropdownMenuItem>
                </DialogTrigger>
                        <DropdownMenuItem>
                          <div className='flex flex-row gap-2 items-center'>
                            <DoorOpen className="text-destructive size-4" />
                            <Link href={`/`}>Log out</Link>
                          </div>
                        </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenuTrigger>
         </DropdownMenu>
        </div>
        <DialogContent className="sm:max-w-md border-0 flex justify-center flex-col items-center">
        <DialogHeader>
          <DialogTitle className="font-medium">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="w-full flex gap-2">
          <div className="w-1/2">
          <Label className="text-content2-day">First Name</Label>
          <Input />
          </div>
          <div className="w-1/2">
          <Label className="text-content2-day">Last Name</Label>
          <Input />
          </div>
        </div>
        <div className="w-full">
          <PhoneNumberInput />
        </div>
        <div className="w-full">
        <div className="w-full">
          <Label className="text-content2-day">Email Address</Label>
          <Input />
          </div>
        </div>
        <DialogFooter className="w-full">
            <Button className="w-full">Save</Button>
        </DialogFooter>
      </DialogContent>
        </Dialog>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div>
            <div className="flex relative">
                <div className="rounded-full h-20 w-20 bg-[#efefef] flex items-center justify-center">
                <p>LE</p> 
                </div>
                <div className="items-end justify-end flex absolute ml-14  mt-11">
                    <Dialog>
                        <DialogTrigger asChild>
                <button className="rounded-full h-9 w-9 bg-text-button flex items-center justify-center">
                    <SquarePen className="text-icon-day size-4"  />
                </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-0 flex justify-center flex-col items-center">
        <DialogHeader>
          <DialogTitle className="font-medium">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="w-full flex gap-2">
          <div className="w-1/2">
          <Label className="text-content2-day">First Name</Label>
          <Input />
          </div>
          <div className="w-1/2">
          <Label className="text-content2-day">Last Name</Label>
          <Input />
          </div>
        </div>
        <div className="w-full">
          <PhoneNumberInput />
        </div>
        <div className="w-full">
        <div className="w-full">
          <Label className="text-content2-day">Email Address</Label>
          <Input />
          </div>
        </div>
        <DialogFooter className="w-full">
            <Button className="w-full">Save</Button>
        </DialogFooter>
      </DialogContent>
                </Dialog>
                </div>
            </div>
        </div>
            <div className="">
                <p className="text-xl font-medium">Leonard</p>
            </div>
            <div className=" flex flex-col gap-1 md:w-1/2 w-full justify-center">
              <div className="text-[#8E95A2]">
                <p>Contact</p>
              </div>
              <div className="flex md:flex-row flex-col justify-between ">
                <div className="flex flex-col gap-1 text-content2-day">
                  <p>Phone Number</p>
                  <p>N/A</p>
                </div>
                <div className="flex flex-col gap-1 text-content-day">
                  <p className="text-content2-day">Email Address</p>
                  <p>okosaleonel@gmail.com</p>
                </div>
              </div> 
                <div className="flex flex-col gap-1 text-content2-day mt-5">
                <p>Position</p>
                <p className="text-content-day"> Function</p>
                <p className="text-content-day">Administrator</p>
              </div>
            </div>
        </div>
    </div>
    </div>
    {/* second part*/}
    <Passwordchange />
    </div>
  )
}
