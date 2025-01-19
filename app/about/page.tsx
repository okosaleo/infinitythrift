import Header from "@/components/about/Header";
import Mission from "@/components/about/mission";
import Values from "@/components/about/Values";
import Vision from "@/components/about/vision";
import Footer from "@/components/Home/Footer";
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
        <Values />
        <Footer />
    </div>
  )
}
