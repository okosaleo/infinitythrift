import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { prisma } from "@/lib/prisma";
import { Ban, EllipsisVertical, TrashIcon } from "lucide-react";

const getData = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
        },
  });
  return data
}
  
export default async function ProfilePage({params}: { params: Promise<{ userId: string }>})  {
    const { userId } = await params;
    const data = await getData(userId);
  return (
    <div className="p-4 w-full flex flex-col"> 
    <div className="bg-[#FAFAFA] w-full h-[70vh] flex flex-col">
        <div className="flex justify-between ml-[500px] items-center">
            <div className="w-16 h-16 bg-active-nav rounded-full flex items-center justify-center mt-9">
                <p className="text-2xl">{data?.name.slice(0, 2)}</p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
            <div className="bg-[#f7f8f8] h-6 w-6 flex items-center justify-center ">
                <EllipsisVertical className="text-icon-day size-7 " />
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <div className="flex gap-3 text-icon-day">
                        <Ban className="size-4"/>
                        <p>Deactivate</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <div className="flex gap-3 text-icon-day">
                        <TrashIcon className="text-destructive size-4" />
                        <p>Delete User</p>
                    </div>
                    </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="flex items-center justify-center mt-5">
            <p className="font-medium text-2xl">{data?.name}</p>
        </div> 
        <div className="flex justify-center items-center flex-col mt-10">
            <div className="flex items-start justify-start mb-5">
                <p className="text-sm text-content2-day">Contact</p>
            </div>
            <div className="flex  gap-12">
                <div className="flex flex-col gap-2">
                    <p>Phone Number</p>
                    <p>N/A</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Email Address</p>
                    <p>{data?.email}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
