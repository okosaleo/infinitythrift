import Header from "@/components/about/Header";
import MainNav from "@/components/Home/MainNav";


export default function page() {
  return (
    <div className="flex flex-col gap-5  relative">
        <MainNav />
        <div>
            <Header />
        </div>
    </div>
  )
}
