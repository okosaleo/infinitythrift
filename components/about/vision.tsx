import Image from "next/image";


export default function Vision() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-6 w-full px-5">
        <div> <h2 className="text-2xl font-semibold">Our Vision</h2></div>
        <div className="flex items-center md:flex-row flex-col gap-3 justify-between ">
            <div className="flex flex-col md:w-3/5 w-full gap-5">
                <div className="bg-[#f7f8f8] border-[1px] border-content-day rounded-md p-5">
                    <p>To build a system where financial security and generational prosperity are accessible to all, powered by a thriving cooperative spirit.</p>
                </div>
                <div className="bg-[#f7f8f8] border-[1px] border-content-day rounded-md p-5">
                To empower our members by providing accessible financial services for our cooperative family.
                </div>
            </div>
            <div>
                    <Image src="/img/naira.jpeg" alt="money Image" width={407} height={408} />
            </div>
        </div>
    </div>
  )
}
