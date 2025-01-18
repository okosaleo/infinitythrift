import Image from "next/image";


export default function Footer() {
  return (
    <div className="w-full flex bg-[black] h-[36vh] px-24 py-14">
        <div className="w-1/3 flex flex-col gap-4">
        <Image src="/img/po.png" alt="footer logo" width={170} height={40} />
        <p className="text-content2-day text-sm">© Copyright 2024. Infinity Thrift & Credit Investment Limited™</p>
        </div>
        <div className="w-1/3 flex flex-col gap-5 text-text-button text-sm">
        <p className="text-xl font-semibold cursor-pointer">Company</p>
        <p className="text-[12px] cursor-pointer">About</p>
        <p className="text-[12px] cursor-pointer">Services</p>
        <p className="text-[12px] cursor-pointer">Terms & Conditions</p>
        </div>
        <div className="w-1/3 flex flex-col gap-24 mt-7">
        <div className="flex flex-col gap-3">
            <p className="text-[12px] cursor-pointer text-text-button">Privacy Policy</p>
            <p className="text-[12px] cursor-pointer text-text-button">FAQ</p>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-[12px] cursor-pointer text-text-button">Find us on social media</p>
            <div></div>
        </div>
        </div>
    </div>
  )
}
