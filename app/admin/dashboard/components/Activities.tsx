'use client';

import useSWR from 'swr';
import { ClockArrowDown } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ActivitiesAdmin() {
  const { data, error } = useSWR('/api/activities', fetcher);

  if (error) {
    return <div>Error loading activities</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const activities = data.activities;

  return (
    <div className="flex flex-col ml-3 w-full bg-text-button mt-10 rounded-md mb-7">
      <div className="flex justify-between w-full p-5">
        <h2 className="text-xl text-content-day font-bold">Activities</h2>
        <Button className="p-2 bg-light-overlay text-content-day rounded-2xl">
          See All
        </Button>
      </div>
      {activities.length === 0 ? (
        <div className="w-full items-center justify-center h-[50vh]">
          <div className="justify-center items-center mt-24 flex flex-col gap-3">
            <ClockArrowDown className="w-6 h-6" />
            <p>All activities by members — savings, loan repayment will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className='grid grid-cols-6 gap-2 p-2'>
            <p>#</p>
            <p>Date</p>
            <p>Transaction ID</p>
            <p>Member</p>
            <p>Savings Category</p>
            <p>Amount</p>
          </div>
          {activities.map((activity: any) => (
            <div key={activity.id} className='grid grid-cols-6 gap-2 border-outline-day px-2 border-b-[0.7px] border-dotted'>
              <p>{activity.id.slice(0, 8)}</p>
              <p>{activity.id.slice(0, 8)}</p>
              <p>{new Date(activity.createdAt).toLocaleString()}</p>
              <p>{activity.user}</p>
              <p>{activity.type}</p>
              <p>{activity.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
