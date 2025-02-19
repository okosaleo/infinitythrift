"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignoutButton from "./sign-out";
import { Copy, LockKeyhole } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface iAppProps {
  refid: string | undefined;
  name: string | undefined;
}

export function UserNav({ refid, name }: iAppProps) {
    const { toast } = useToast();
    const handleCopy = () => {
      if (refid) {
        navigator.clipboard.writeText(refid).then(() => {
          toast({
            title: "Referral link copied",
            description: "You have just copied your referral link."
          })
        }).catch(err => {
          console.error("Failed to copy text: ", err);
        });
      }
    };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full ">
          <Avatar className="h-10 w-10 bg-outline-day hover:bg-active-nav">
            <AvatarFallback className="bg-outline-day font-bold uppercase hover:bg-active-nav">{name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-primary-day border-[1px]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-row items-start gap-2">
          <Avatar className="h-10 w-10 bg-outline-day hover:bg-active-nav">
            <AvatarFallback className="bg-outline-day font-bold uppercase hover:bg-active-nav">{name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-start">
          <p className="text-xs leading-none text-content-day font-medium mt-2">
              {name}
            </p>
            <p className="font-semibold uppercase bg-outline-day p-1 rounded-md">{refid}</p>
          </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="flex-row flex gap-2 items-start cursor-pointer w-full" onClick={handleCopy}>
            <div className="cursor-pointer"><Copy   className="size-5 text-content-day" /></div>
            <div className="flex flex-col gap-1 text-content-day">
              <p className="leading-none text-[12px]">Referral Code</p>
              <p className="leading-none font-medium">{refid}</p>
            </div>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/forgot-password" className="flex-row flex gap-2 items-start ">
            <div className="cursor-pointer"><LockKeyhole className="size-5 text-content-day" /></div>
            <div className=" text-content-day">
              <p className="leading-none text-sm  font-medium">Change Password</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}