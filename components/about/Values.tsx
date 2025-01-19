import Image from "next/image"


const values = [
    {
        id: 1,
        image: "/img/intee.png",
        label: "Integrity",
        quote:  "Committing to transparency and fairness in all operations, protecting customers/members’ interests and building trust through ethical practices."
    },
    {
        id: 2,
        image: "/img/nuture.png",
        label: "Nuturing",
        quote:  "We prioritize the growth and well-being of each member, creating a supportive environment to help achieve financial and personal goals."
    },
    {
        id: 3,
        image: "/img/fore.png",
        label: "Foresight",
        quote:  "We make future-focused decisions, guiding our cooperative toward long-term prosperity for current and future members."
    },
    {
        id: 4,
        image: "/img/inno.png",
        label: "Innovation",
        quote:  "We embrace new ideas and creative solutions to adapt to changing needs and enhance financial opportunities."
    },
]

const val = [
    {
        id: 5,
        image: "/img/net.png",
        label: "Networking",
        quote:  "We build strong relationships within the cooperative and with external partners to support our members."
    },
    {
        id: 6,
        image: "/img/inclu.png",
        label: "Inclusion",
        quote:  "We are dedicated to fostering an inclusive environment where every member feels valued and empowered to contribute to our success."
    },
    {
        id: 7,
        image: "/img/timel.png",
        label: "Timeless",
        quote:  "We uphold enduring principles and values, ensuring relevant and dependable practices."
    },
    {
        id: 8,
        image: "/img/yield.png",
        label: "Yielding",
        quote:  "We strive for meaningful returns and sustainable growth, ensuring our members benefit from productive investments that enhance their financial well-being."
    },
]

export default function Values() {
  return (
    <div className="flex flex-col justify-center items-center mt-16 gap-6 w-full px-5  bg-[#f7f8f8]">
        <div className="mt-12 py-10">
            <h2 className="text-2xl font-semibold">Core Values</h2>
        </div>
        <div className="flex flex-col gap-3 w-full items-center justify-center">
            <div className="flex flex-row flex-wrap gap-3 w-full items-center justify-center">
            {values.map((item) => (
                <div key={item.id} className="flex items-center justify-center gap-3 flex-col bg-text-button p-4 w-64 h-64">
                    <Image src={item.image} alt="Value Images"  width={34} height={24}/>
                    <div><h4>{item.label}</h4></div>
                    <div><p className="text-center">{item.quote}</p></div>
                </div>
            ))}
            </div>
            <div className="flex flex-row flex-wrap gap-3 w-full items-center justify-center">
              {val.map((item) => (
                <div key={item.id} className="flex items-center justify-center gap-3 flex-col bg-text-button p-4 w-64 h-64">
                    <Image src={item.image} alt="Value Images"  width={34} height={24}/>
                    <div><h4>{item.label}</h4></div>
                    <div><p className="text-center">{item.quote}</p></div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}
