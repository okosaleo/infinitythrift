"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Verified() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsNavigating(true);
    router.push("/dashboard")
    setIsNavigating(false)
  };


  return (
    <div className="bg-[url('https://utfs.io/f/mLASHSxEsNLiuuEsIS1jozy9UTrqw6tkM4On82eKlLvIfSu7')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen">
        <Card className="lg:w-1/2 w-2/3 lg:h-fit flex flex-col items-center justify-center">
            <CardContent className="w-full flex items-center justify-center flex-col gap-7 p-3 mb-4">
                <div className="rounded-full border-[1px] border-positive-day lg:w-16 lg:h-16 h-12 w-12 flex items-center justify-center "><Check className="lg:size-9  size-8 text-positive-day" /></div>
                <div className="text-content-day flex flex-col items-center justify-center">
                    <h3 className="md:text-2xl text-base font-semibold">Email Verified</h3>
                    <p className="md:text-sm text-[10px] ">You have successfully verified your email. Kindly proceed to dashboard.</p>
                    </div>
            </CardContent>
            <CardFooter className="w-full">
            <Link
            href="/dashboard"
            onClick={handleNavigation}
            className="text-text-button rounded-md py-2 flex justify-center bg-primary-day w-full hover:bg-hover-btn transition-colors"
          >
            {isNavigating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting...
              </div>
            ) : (
              "Proceed To Dashboard"
            )}
                      </Link>
            </CardFooter>
        </Card>

    </div>
  )
}
