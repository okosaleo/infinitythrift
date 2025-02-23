import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, BadgeXIcon, CheckCircle2, ScrollText, } from "lucide-react";
import Link from "next/link";
import KYC from "../../kyc/page";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: { kyc: true },
  });
  return data;
};

export default async function KYCpage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  const userId = session.user.id;
  const data = await getData(userId);

  return (
    <div className="flex flex-col gap-2">
      <div className="border-b-[1px] border-b-outline-day h-16 w-full flex items-center gap-2 px-4">
        <Link href="/dashboard/settings">
          <ArrowLeft className="size-4 text-content-day" />
        </Link>
        <h1 className="text-2xl font-semibold text-content-day">Settings</h1>
      </div>
      <div className="border-b-[1px] border-b-outline-day h-10 w-full flex items-center gap-2 px-4">
        <h1 className="text-sm font-semi-bold text-content-day ml-3">
          Settings / KYC /
        </h1>
      </div>

      {/* If KYC is missing or rejected, prompt user to complete KYC */}
      {(!data?.kyc) && (
        <Dialog>
          <div className="w-full flex items-center justify-center h-[70vh] flex-col gap-2 p-5">
            <div className="h-14 w-14 rounded-full bg-[#f7f8f8] flex items-center justify-center">
              <ScrollText className="size-5 text-content-day" />
            </div>
            <div>
              <p className="md:text-base text-[13px] w-full">
                Complete your KYC verification to have full access.
              </p>
            </div>
            <div>
              <DialogTrigger>
                <Button>Complete KYC</Button>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="border-0">
            <DialogHeader className="flex items-center justify-between">
              <DialogTitle className="text-content-day">
                Complete KYC
              </DialogTitle>
              <DialogTitle className="text-content2-day text-sm font-light">
                Personal Information
              </DialogTitle>
            </DialogHeader>
            <KYC />
          </DialogContent>
        </Dialog>
      )}

      {data?.kyc && data?.kyc.kycstatus === "REJECTED" && (
        <div className="flex flex-col items-center justify-center h-[60vh] p-8">
          <BadgeXIcon className="text-destructive-day size-6"/>
          <p className="text-primary-day">Your KYC request has been rejected. Try again on the dashboard.</p>
        </div>

      )}
      {data?.kyc && data.kyc.kycstatus === "PENDING" && (
        <div className="flex flex-col items-center justify-center h-[60vh] p-8">
          <h2 className="text-xl font-semibold text-content-day">
            KYC Verification Pending
          </h2>
          <p className="text-content2-day text-sm">
            Your KYC verification is currently pending. Please wait for the
            verification process to complete.
          </p>
        </div>
      )}

      {/* If KYC is approved, display KYC information */}
      {data?.kyc && data.kyc.kycstatus === "APPROVED" && (
        <div className="flex flex-col items-start justify-center p-8 w-full">
          <div className="mt-4 space-y-2 w-full">
            <div className="border-b-[1px] border-b-outline-day flex items-center gap-3 border-dotted lg:w-1/3 w-2/3">
            <p className="text-xl">Status</p>
            <CheckCircle2 className="text-positive-day size-4" />
            <p className="font-medium">Verified</p>
            </div>
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
            {/* Add more fields as necessary */}
          </div>
        </div>
      )}
    </div>
  );
}
