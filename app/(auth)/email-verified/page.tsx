import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";


export default function Verified() {
  return (
    <div className="bg-[url('/img/infi.png')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen">
        <Card className="lg:w-1/2 w-2/3 lg:h-fit flex flex-col items-center justify-center ">
            <CardContent className="w-full flex items-center justify-center flex-col gap-7 p-3 mb-4">
                <div className="rounded-full bg-primary-nav lg:w-16 lg:h-16 h-12 w-12 flex items-center justify-center "><Check className="lg:size-9  size-8 text-primary-day" /></div>
                <div className="text-content-day flex flex-col items-center justify-center">
                    <h3 className="md:text-2xl text-base font-semibold">Email Verified</h3>
                    <p className="md:text-sm text-[10px] ">You have successfully verified your email. Kindly proceed to dashboard.</p>
                    </div>
            </CardContent>
            <CardFooter className="w-full">
            <Button className="text-text-button bg-primary-day w-full hover:bg-hover-btn">Proceed To Dashboard</Button>
            </CardFooter>
        </Card>

    </div>
  )
}
