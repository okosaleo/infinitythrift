import { prisma } from "@/lib/prisma";
import { ScrollText } from "lucide-react";
import Image from "next/image";
import Kycbutton from "./kycbutton";


const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      kyc: true 
    },
  });

  return data;
};

export default async function KYCpage({params}: { params: Promise<{ userId: string }>}) {
    const { userId } = await params;
  const data = await getData(userId);
  return (
    <div>
        {!data?.kyc && (
            <div className="w-full flex items-center justify-center h-[70vh] flex-col gap-2 p-5">
            <div className="h-14 w-14 rounded-full bg-[#f7f8f8] flex items-center justify-center">
              <ScrollText className="size-5 text-content-day" />
            </div>
            <div>
              <p className="md:text-base text-[13px] w-full">
                User has no KYC verification
              </p>
            </div>
            </div>
        )}
        {data?.kyc  && (
        <div className="flex flex-col items-start justify-center p-8 w-full">
          <div className="mt-4 space-y-2 w-full">
            <div className="border-b-[1px] border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
              <p className="text-content2-day text-sm">Personal Information</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Full Name</p>
            <p>{data.kyc.firstName} {data.kyc.lastName}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Date Of Birth</p>
            <p>{data.kyc.dob.toLocaleDateString()}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Gender </p>
            <p>{data.kyc.gender}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>City </p>
            <p>{data.kyc.city}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>State </p>
            <p>{data.kyc.state}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Proof of Address Type</p>
            <p>{data.kyc.idType}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Proof of Address Upload</p>
            <Image src={data.kyc.proofOfAddress} alt="PROOF OF ADDRESS IMAGE" unoptimized width={120} height={120} className="rounded-md"/>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p className="text-content2-day">Employment and Financial Information</p> 
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Occupation</p>
            <p>{data.kyc.occupation}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Employer</p>
            <p>{data.kyc.employer}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Monthly Earning Estimate</p>
            <p>{data.kyc.monthlyIncome.toString()}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Bank Verification Number (BVN)</p>
            <p>{data.kyc.bvn}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p className="text-content2-day">Identification Documents</p> 
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Issued ID Type</p>
            <p>{data.kyc.idType}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>ID Upload</p>
            <Image src={data.kyc.idImage} alt="PROOF OF ADDRESS IMAGE" unoptimized width={120} height={120} className="rounded-md"/>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Identification Number</p>
            <p>{data.kyc.idNumber}</p>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Photo</p>
            <Image src={data.kyc.selfie} alt="PROOF OF ADDRESS IMAGE" unoptimized width={120} height={120} className="rounded-md"/>
            </div>
            <div className="border-b-[1px] text-sm justify-between border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p>Signature</p>
            <p>{data.kyc.signature}</p>
            </div>
            <div>
                <Kycbutton userId={data.id}/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
