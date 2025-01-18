import Image from "next/image";


export default function Joinus() {
  return (
    <div className=" px-5 flex flex-col gap-5 w-full text-content-day h-2/3 relative">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <h2 className="text-2xl font-semibold">Why Join Us?</h2>
          <p className="text-sm">Here&apos;s why our members choose us:</p>
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex md:flex-row flex-col gap-3">
            <div className="h-16 md:w-1/2 w-full bg-[#fdca28] rounded-md flex flex-row p-1 items-center">
            <div className="flex items-center justify-start p-3">
              <Image src="/img/ill.png" alt="image" width={25} height={25} />
            </div>
            <div className="flex flex-col justify-start gap-1 ">
              <p className="text-primary-day text-sm font-semibold">Financial Empowerment</p>
              <p className="text-[12px] text-content2-day">Achieve your goals with personalized support and affordable loans.</p>
            </div>
            </div>
            <div className="h-16  md:w-1/2 w-full bg-[#fdca28] rounded-md flex flex-row p-1 items-center">
            <div className="flex items-center justify-start p-3">
              <Image src="/img/cash.png" alt="image" width={25} height={25} />
            </div>
            <div className="flex flex-col justify-start gap-1 ">
              <p className="text-primary-day text-sm font-semibold">Affordable Solutions</p>
              <p className="text-[12px] text-content2-day">Access low-interest loans and fair rates.</p>
            </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-3">
          <div className="h-16  md:w-1/2 w-full bg-[#fdca28] rounded-md flex flex-row p-1 items-center">
            <div className="flex items-center justify-start p-3">
              <Image src="/img/memb.png" alt="image" width={25} height={25} />
            </div>
            <div className="flex flex-col justify-start gap-1 ">
              <p className="text-primary-day text-sm font-semibold">Community Values</p>
              <p className="text-[12px] text-content2-day">Enjoy a supportive network built on cooperation and integrity.</p>
            </div>
            </div>
            <div className="h-16  md:w-1/2 w-full bg-[#fdca28] rounded-md flex flex-row p-1 items-center">
            <div className="flex items-center justify-start p-3">
              <Image src="/img/shield.png" alt="image" width={25} height={25} />
            </div>
            <div className="flex flex-col justify-start gap-1 ">
              <p className="text-primary-day text-sm font-semibold">Trusted Guidance</p>
              <p className="text-[12px] text-content2-day">Get expert advice on savings and investments.</p>
            </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <div className="h-16 md:w-1/2 w-full bg-[#fdca28] rounded-md flex flex-row p-1 items-center">
            <div className="flex items-center justify-start p-3">
              <Image src="/img/tropy.png" alt="image" width={25} height={25} />
            </div>
            <div className="flex flex-col justify-start gap-1 ">
              <p className="text-primary-day text-sm font-semibold">Exceptional Service</p>
              <p className="text-[12px] text-content2-day">Experience respectful, positive service.</p>
            </div>
            </div>
        </div>
    </div>
  )
}
