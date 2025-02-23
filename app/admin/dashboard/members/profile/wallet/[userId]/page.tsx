import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import WalletFund from "./component/walletFund";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      wallet: {
        select: {
          balance: true 
        }
      },
    },
  });

  return data;
};


export default async function Wallet({params}: { params: Promise<{ userId: string }>}) {
  const { userId } = await params;
  const data = await getData(userId);
  return (
    <div className="flex flex-col gap-2">
    <div className="border-b-[1px] bg-[#f7f8f8] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
       <h1 className="text-2xl font-semi-bold text-content-day">Fund Wallet</h1>
    </div>
    <div className="flex items-center justify-center h-[70vh]">
    <Card className="lg:w-1/3 w-1/2">
        <CardHeader className="flex items-center justify-center">
            <CardTitle>Fund Wallet</CardTitle>
        </CardHeader>
        <CardContent >
          <div className="flex flex-col gap-3 w-full">
            <div className="bg-[#f7f8f8] w-full flex items-center justify-between p-2">
              <div className="flex flex-col items-start gap-2">
                <p>Name</p>
                <p>{data?.name}</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p>Member ID</p>
                <p>{data?.id.slice(0, 8)}</p>
              </div>
              
            </div>
            <div>
                <WalletFund userId={data?.id} />
              </div>
          </div>
        </CardContent>
    </Card>
    </div>
    </div>
  )
}
