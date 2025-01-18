import { ChevronRight } from "lucide-react";
import Image from "next/image";


export default function AboutUs() {
  return (
    <div className="lg:py-36 py-5 md:px-16 px-5 2xl:mt-[00px] md:mt-[220px] mt-32 md:max-lg:mt-[300px] w-full h-2/5 relative flex md:flex-row flex-col gap-10 justify-center">
        <div className="">
            <Image src="/img/infi.png" alt="Infi IMage" width={407} height={408} />
        </div>
        <div className="flex flex-col md:gap-10 gap-5 md:w-1/2 w-full">
            <h2 className="text-content-day lg:text-3xl text-2xl  font-semibold">About Us</h2>
            <p className="md:text-base text-[10px]">At Infinity Thrift and Credit Investment Limited, we believe in the power of community, mutual support, and financial empowerment. Our cooperative was established to provide individuals and families who are our members with an affordable and sustainable way to meet their financial goals. Whether you're saving for the future, borrowing to meet urgent needs, or looking to grow your financial literacy, we are here to support you every step of the way.</p>
            <div className="text-primary-day flex items-center cursor-pointer">Read More <ChevronRight className="text-primary-day size-4" /></div>
        </div>
        
    </div>
  )
}
