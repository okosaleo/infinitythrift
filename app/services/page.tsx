import Footer from "@/components/Home/Footer";
import MainNav from "@/components/Home/MainNav";
import { Banknote, CalendarCheck, HandCoins, Headset, SearchCheck } from "lucide-react";

const hello = [
    {
        id: 1,
        head: "Marketing of Financial Products",
        quote: "We promote a variety of financial services, including savings plans, loans, and investment options, with a focus on community and affordability.",
        icon: SearchCheck
    },
    {
        id: 2,
        head: "Financial Consultancy",
        quote: "We offer expert advice and personalized guidance to help members make informed financial decisions and promote growth.",
        icon: SearchCheck
    },
    {
        id: 3,
        head: "Savings Plan",
        quote: "Our flexible savings options cater to different needs, helping members accumulate wealth with competitive returns.",
        icon: HandCoins
    },
]

const you = [
    {
        id: 4,
        head: "Affordable Loans",
        quote: "We provide low-interest loans to ensure fair access to credit, empowering members without financial strain.",
        icon: Banknote
    },
    {
        id: 5,
        head: "Customer Services",
        quote: "We prioritize exceptional, courteous service in every member interaction, aiming to exceed expectations by providing consistent, high-quality support.",
        icon: Headset
    },
]


export default function Services() {
  return (
    <div className="flex flex-col gap-8">
        <MainNav />
        <div className="flex justify-center items-center">
            <h1 className="font-medium text-content-day text-3xl">Services</h1>
        </div>
        <div className="flex flex-col gap-8 p-10">
        <div className="flex flex-col gap-2">
            <HandCoins className="size-7 text-primary-day" />
            <h2 className="text-xl text-content-day font-medium">Individual Savings</h2>
            <p className="md:text-sm  text-[11px] text-content2-day">Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
</p>
        </div>
        <div className="flex flex-col gap-2">
            <CalendarCheck className="size-7 text-primary-day" />
            <h2 className="text-xl text-content-day font-medium">Thrift Savings</h2>
            <p className="md:text-sm  text-[11px] text-content2-day">Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
</p>
        </div>
        <div className="flex flex-col gap-2">
            <Banknote className="size-7 text-primary-day" />
            <h2 className="text-xl text-content-day font-medium">Loan Services</h2>
            <p className="md:text-sm  text-[11px] text-content2-day">Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
</p>
        </div>
        </div>

        <div className="flex flex-col gap-10 bg-[#fafafa] w-full">
            <div className="flex items-center justify-center mt-12">
                <h2 className="font-medium text-2xl">What We Offer</h2>
            </div>

            <div className="flex flex-row w-full gap-10 flex-wrap p-10">
            <div className="flex flex-row flex-wrap gap-3 w-full items-center justify-center">
                {hello.map((items) => (
                    <div key={items.id} className="flex rounded-md flex-col p-3 gap-4 w-64 h-64 bg-text-button">
                        <items.icon className="text-primary-day size-5" /> 
                        <h3 className="text-content-day font-medium text-base">{items.head}</h3>
                        <p className="text-content2-day font-light text-[12px]">{items.quote}</p>
                    </div>
                ))}
                </div>
                <div className="flex flex-row flex-wrap gap-3 w-full items-center justify-center">
                {you.map((items) => (
                    <div key={items.id} className="flex rounded-md flex-col p-3 gap-4 w-64 h-64 bg-text-button">
                        <items.icon className="text-primary-day size-5" /> 
                        <h3 className="text-content-day font-medium text-base">{items.head}</h3>
                        <p className="text-content2-day font-light text-[12px]">{items.quote}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
