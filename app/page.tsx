
import AboutUs from "@/components/Home/AboutUs";
import ContactUs from "@/components/Home/ContactUs";
import Footer from "@/components/Home/Footer";
import Joinus from "@/components/Home/Joinus";
import MainNav from "@/components/Home/MainNav";
import Members from "@/components/Home/Members";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
  <div className="flex flex-col relative">
    <MainNav />
    <div className="bg-[url('/img/mij.jpeg')] lg:bg-[length:100vw_100vh] bg-[length:100vw_80vh]  bg-center w-full lg:h-[80vh] h-[50vh] relative">
    <div className="absolute z-10 bg-[#55371bcb] w-full lg:h-[80vh] h-[50vh]">
      <div className="justify-center flex mt-9 flex-col items-center gap-4">
        <div className="md:text-5xl text-2xl text-text-button font-bold">
          <div className="flex flex-col justify-center items-center md:gap-2 gap-1">
          <h1>Save Securely, Thrive </h1>
          <h1>Confidently.</h1>
          </div>
        </div>
        <div className="text-text-button md:text-base text-[12px] md:px-0 px-6" >
          <p>Reliable thrift plans built to grow your contributions and safeguard your financial journey.</p>
        </div>
        <div className="flex items-center flex-row justify-center gap-3" >
          <Link href="/sign-in" className="border-[1px]  border-text-button text-text-button px-4 py-2 rounded-md">Log in</Link>
          <Link href="/sign-up" className="bg-text-button text-primary-day rounded-md px-4 py-2" >Start Saving Today</Link>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
      <div className="md:w-[1000px] md:h-[601px] w-[400px] h-[298px] mt-[10px] relative z-30 ">
        <Image src="/img/Home.png" alt="Home Image" fill />
      </div>
      </div>
    </div>

    </div>

    <AboutUs />
    <div>
      <Joinus />
    </div>
    <Members />
    <ContactUs />
    <Footer />
  </div>
  );
}
