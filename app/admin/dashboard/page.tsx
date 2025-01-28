import { Chart } from "@/components/chart/chart";
import { Banknote, CalendarCheck, CircleArrowOutUpRight, HandCoins, MessageCircleIcon, MessageCircleQuestion, UsersRound } from "lucide-react";

  const items = [
    {
      id: 1,
      value: 0,
      des: "TOTAL REVENUE",
      icon: CircleArrowOutUpRight
    },
    {
      id: 2,
      value: 0,
      des: "TOTAL STRUCTURED SAVINGS",
      icon: HandCoins
    },
    {
      id: 3,
      value: 0,
      des: "TOTAL THRIFT SAVINGS",
      icon: CalendarCheck
    },
    {
      id: 4,
      value: 0,
      des: "TOTAL LOANS",
      icon: Banknote
    },
    {
      id: 5,
      value: 0,
      des: "TOTAL MEMBERS",
      icon: UsersRound
    },
    {
      id: 6,
      value: 0,
      des: "LOANS REQUESTS",
      icon: MessageCircleQuestion
    },
  ]


export default function page() {
  return (
    <div className="flex flex-col p-7  relative bg-[#f7f8f8]">
       {/* OverView */}
       <div className="w-full ">
          <div className="mb-7">
            <h1 className="text-xl font-semibold text-content2-day">Overview</h1>
          </div>
          {/* Cards */}
          <div className="flex lg:flex-row flex-col flex-wrap md:gap-5 gap-3 ">
       
         {items.map((item) => (
           <div key={item.id} className="bg-gradient-to-r from-hover-btn to-[#2e1905] lg:w-1/4 w-full h-32 rounded-md flex justify-between p-5  items-center">
            <div className="text-text-button flex flex-col gap-7">
              <p>{item.value}</p>
              <p>{item.des}</p>
            </div>
            <div>
              <div className="h-14 w-14 bg-[#a79e9e6c] rounded-md flex items-center justify-center">
                <item.icon className="size-4 text-text-button" />
              </div>
            </div>
          </div>
        ))}
          </div>
            {/* Charts */}
            <div className="flex lg:flex-row flex-col w-full mt-5 gap-5  h-fit">
              <div className="lg:w-3/5 w-full ">
                <Chart />
              </div>
              <div className="lg:w-2/5 w-full flex flex-col gap-4 ">
              <div className="bg-text-button flex flex-col gap-16 h-[34vh] rounded-md shadow-sm">
                <div className="flex items-center gap-3 justify-start p-3">
                  <Banknote className="text-icon-day size-6" />
                  <p className="font-medium">Loans</p>
                </div>
                <div className="flex justify-center items-center flex-col gap-6 p-5">
                  <Banknote className="size-5 " />
                  <p className="text-[13px] text-content-day text-center">Loans approaching the deadline for repayment will appear here</p>
                </div>
              </div>
              <div className="bg-text-button flex flex-col gap-16 h-[34vh] rounded-md shadow-sm">
                <div className="flex items-center gap-3 justify-start p-3">
                  <MessageCircleQuestion className="text-icon-day size-6" />
                  <p className="font-medium">Loans Requests(0)</p>
                </div>
                <div className="flex justify-center items-center flex-col gap-6 p-5">
                  <MessageCircleQuestion className="size-5 " />
                  <p className="text-[13px] text-content-day text-center">Loan requests by members will appear here</p>
                </div>
              </div>
              </div>
            </div>

            {/* Activities*/}
            <div className="flex flex-col ml-3 w-full bg-text-button mt-4 rounded-md">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full p-5">
            <h2 className="text-xl text-content-day font-bold">Activities</h2>
            <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>

          {/* Members Ranking*/}
          <div className="flex flex-col ml-3 w-full bg-text-button mt-4 rounded-md">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full p-5">
            <h2 className="text-xl text-content-day font-bold">Members Ranking</h2>
            <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
            
        </div>
    </div>
  )
}
