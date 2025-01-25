import Faq from "@/components/faq/faq";
import MainNav from "@/components/Home/MainNav";


export default function page() {
  return (
    <div className="flex flex-col gap-8 bg-active-nav">
          <MainNav /> 
          <div className=" bg-active-nav w-full h-fit md:p-16 p-8">
            <Faq />
          </div>
    </div>
  )
}
