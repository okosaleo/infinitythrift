import { Chart } from "@/components/chart/chart";
import { prisma } from "@/lib/prisma";
import { Banknote, CalendarCheck, CircleArrowOutUpRight, ClockArrowDown, HandCoins, MessageCircleQuestion, Users, UsersRound } from "lucide-react";
import ActivitiesAdmin from "./components/Activities";
import MembersRanking from "./components/Ranking";


// Data fetching functions
const getTotalRevenue = async () => {
  return await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { 
      type: { in: ['DEPOSIT', 'LOAN_REPAYMENT'] },
      status: 'COMPLETED'
    }
  });
};

const getTotalStructuredSavings = async () => {
  return await prisma.categorySavings.aggregate({
    _sum: { amount: true }
  });
};

const getTotalThriftSavings = async () => {
  return await prisma.thriftSavings.aggregate({
    _sum: { currentAmount: true }
  });
};

const getTotalLoans = async () => {
  return await prisma.loan.aggregate({
    _sum: { amount: true },
    where: { status: 'ACTIVE' }
  });
};

const getTotalMembers = async () => {
  return await prisma.user.count();
};

const getLoanRequests = async () => {
  return await prisma.loanRequest.count({
    where: { status: 'PENDING_REVIEW' }
  });
};

export default async function DashboardPage() {
  const [
    revenue,
    structuredSavings,
    thriftSavings,
    loans,
    members,
    loanRequests
  ] = await Promise.all([
    getTotalRevenue(),
    getTotalStructuredSavings(),
    getTotalThriftSavings(),
    getTotalLoans(),
    getTotalMembers(),
    getLoanRequests()
  ]);

  const items = [
    {
      id: 1,
      value: revenue._sum.amount?.toNumber() || 0,
      des: "TOTAL REVENUE",
      icon: CircleArrowOutUpRight
    },
    {
      id: 2,
      value: structuredSavings._sum.amount?.toNumber() || 0,
      des: "TOTAL STRUCTURED SAVINGS",
      icon: HandCoins
    },
    {
      id: 3,
      value: thriftSavings._sum.currentAmount?.toNumber() || 0,
      des: "TOTAL THRIFT SAVINGS",
      icon: CalendarCheck
    },
    {
      id: 4,
      value: loans._sum.amount?.toNumber() || 0,
      des: "TOTAL LOANS",
      icon: Banknote
    },
    {
      id: 5,
      value: members,
      des: "TOTAL MEMBERS",
      icon: UsersRound
    },
    {
      id: 6,
      value: loanRequests,
      des: "LOANS REQUESTS",
      icon: MessageCircleQuestion
    },
  ];

  return (
    <div className="flex flex-col p-7 relative bg-[#f7f8f8]">
      {/* OverView */}
      <div className="w-full">
        <div className="mb-7">
          <h1 className="text-xl font-semibold text-content2-day">Overview</h1>
        </div>
        
        {/* Cards */}
        <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-5 gap-3">
          {items.map((item) => (
            <div key={item.id} className="bg-gradient-to-r from-hover-btn to-[#2e1905] lg:w-full w-full h-32 rounded-md flex justify-between p-5 items-center">
              <div className="text-text-button flex flex-col gap-7">
                <p>{item.value.toLocaleString()}</p>
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
          <ActivitiesAdmin />

          {/* Members Ranking*/}
         <MembersRanking />
           
      </div>
    </div>
  )
}
