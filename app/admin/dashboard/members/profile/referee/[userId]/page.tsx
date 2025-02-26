// components/RefereeList.tsx
import { prisma } from '@/lib/prisma';

const getData = async (userId: string) => {
const data = await prisma.referral.findMany({
    where: { referrerId: userId },
    select: {
      createdAt: true,
      referredUserName: true,
      id: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return data
}

export default async function RefereeList({params}: { params: Promise<{ userId: string }>}) {
  // Fetch all referrals where the current user is the referrer
  const { userId } = await params;
    const data = await getData(userId);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">User Referees</h2>
      {data.length === 0 ? (
        <p>No referees found.</p>
      ) : (
        <ul className="space-y-2">
          {data.map((ref) => (
            <li key={ref.id} className="border border-primary-day p-2 rounded">
              <div className="font-semibold">Username: {ref.referredUserName}</div>
              {/* In this example, we are using the referred username as the account info */}
              <div className="text-sm text-gray-600">Account: {ref.referredUserName}</div>
              <p>Signed Up:</p>
              <p>{ref.createdAt.toDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
