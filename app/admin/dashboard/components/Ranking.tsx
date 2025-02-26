// app/components/MembersRanking.tsx
import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react'; // or your preferred icon component

// This function queries all users and computes total savings.
async function getMembersRanking() {
  const members = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      thriftSavings: {
        select: { currentAmount: true },
      },
      categorySavings: {
        select: { amount: true },
      },
      structuredSavings: {
        select: { currentAmount: true },
      },
      loans: {
        select: { amount: true },
      },
    },
  });

  // Compute total savings for each member
  const ranking = members.map((member) => {
    const thriftTotal = member.thriftSavings.reduce(
      (sum, ts) => sum + parseFloat(ts.currentAmount.toString()),
      0
    );
    const categoryTotal = member.categorySavings.reduce(
      (sum, cs) => sum + parseFloat(cs.amount.toString()),
      0
    );
    const structuredTotal = member.structuredSavings.reduce(
      (sum, ss) => sum + parseFloat(ss.currentAmount.toString()),
      0
    );
    const loansTotal = member.loans.reduce(
      (sum, ss) => sum + parseFloat(ss.amount.toString()),
      0
    );
    const totalSavings = thriftTotal + categoryTotal + structuredTotal;
    return {
      id: member.id,
      name: member.name,
      totalSavings,
      loansTotal,
    };
  });

  // Sort descending by total savings
  ranking.sort((a, b) => b.totalSavings - a.totalSavings);

  return ranking;
}

// Asynchronous server component for ranking members
export default async function MembersRanking() {
  const ranking = await getMembersRanking();

  // If no ranking data, display empty state
  if (ranking.length === 0) {
    return (
      <div className="flex flex-col ml-3 w-full bg-text-button mt-4 rounded-md">
        <div className="flex justify-between w-full p-5">
          <h2 className="text-xl text-content-day font-bold">Members Ranking</h2>
          <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
        </div>
        <div className="w-full items-center justify-center h-[50vh]">
          <div className="justify-center items-center mt-24 flex flex-col gap-3">
            <Users className="w-6 h-6 text-primary-day" />
            <p>
              Members with the most savings will appear here. All activities by members — savings, loan repayment will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render ranking list
  return (
    <div className="flex flex-col w-full bg-text-button">
      <div className="flex justify-between w-full p-5">
        <h2 className="text-xl text-content-day font-bold">Members Ranking</h2>
        <button className="p-2 bg-light-overlay rounded-2xl">See All</button>
      </div>
      <div className="w-full px-5">
      <div className='grid grid-cols-5 gap-2 p-2'>
        <p>#</p>
            <p>Membership ID </p>
            <p>Member</p>
            <p>Total Savings</p>
            <p>Total Loans</p>
        </div>
        {ranking.map((member, index) => (
          <div key={member.id} className='grid grid-cols-5 gap-2 p-2'>
            <p>{index + 1}</p>
            <p>{member.id.slice(0, 8)}</p>
            <p>{member.name}</p>
            <p>{member.totalSavings}</p>
            <p>{member.loansTotal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}