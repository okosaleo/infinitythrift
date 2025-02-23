"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
    text: string;
    className?: string;
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

export default function SubmitLoaders({text, className, variant}: iAppProps) {
    const {pending} = useFormStatus();
  return (
    <>
    {
        pending ? (
            <Button  disabled className={cn('w-full', className)} variant={variant}>
                <Loader2 className="mr-2 size-4 animate-spin" /> Please Wait
            </Button>
        ) : (
            <Button className={cn("w-full", className)} variant={variant} type="submit">
                {text}
            </Button>
        )
    }
    </>
  )
}