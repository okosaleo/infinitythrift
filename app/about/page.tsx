import Header from "@/components/about/Header";
import Mission from "@/components/about/mission";
import Vision from "@/components/about/vision";
import MainNav from "@/components/Home/MainNav";


export default function page() {
  return (
    <div className="flex flex-col gap-5  relative">
        <MainNav />
        <div>
            <Header />
        </div>
        <Mission />
        <Vision />
    </div>
  )
}
