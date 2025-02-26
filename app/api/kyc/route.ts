import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { kycSchema } from "@/lib/kycSchemas";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { KYCStatus } from "@prisma/client"; // Import the enum

// Helper to map gender string to Prisma Gender enum.
function mapGender(gender: string): "MALE" | "FEMALE" | "OTHER" {
  const lower = gender.toLowerCase();
  if (lower === "male") return "MALE";
  if (lower === "female") return "FEMALE";
  return "OTHER";
}

// Helper to map ID type string to IdentificationType enum.
function mapIdentificationType(type: string): "NATIONAL_ID" | "PASSPORT" | "DRIVERS_LICENSE" | "VOTERS_CARD" {
  const lower = type.toLowerCase();
  if (lower.includes("national")) return "NATIONAL_ID";
  if (lower.includes("passport")) return "PASSPORT";
  if (lower.includes("voter")) return "VOTERS_CARD";
  if (lower.includes("license") || lower.includes("licence")) return "DRIVERS_LICENSE";
  return "NATIONAL_ID";
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming JSON payload using your Zod schema.
    const body = await req.json();
    const data = kycSchema.parse(body);

    // Retrieve session to obtain the secure userId.
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;

    // Transform fields.
    const dob = new Date(data.dateOfBirth);
    const monthlyIncome = parseFloat(data.monthlyIncomeEstimate);
    const gender = mapGender(data.gender);
    const idType = mapIdentificationType(data.issuedIdType);

    // Build the payload including all required fields.
    const kycPayload = {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: dob,
      gender: gender,
      address: data.address,
      state: data.state,
      city: data.city,
      proofOfAddress: data.proofOfAddressFile,
      phoneNumber: data.phoneNumber,
      occupation: data.occupation,
      employer: data.employer,
      monthlyIncome: monthlyIncome,
      bvn: data.bvn,
      idType: idType,
      signature: data.signature,
      idNumber: data.identificationNumber,
      idImage: data.idUpload,
      idWithSelfie: data.selfieWithId,
      selfie: data.idSelfie, // Provide a default if missing
      kycstatus: KYCStatus.PENDING,  // Use the enum value from Prisma
    };

    // Check if a KYC record exists for this user.
    const existingKYC = await prisma.kYC.findUnique({ where: { userId } });
    let result;
    if (!existingKYC) {
      result = await prisma.kYC.create({ data: kycPayload });
    } else {
      result = await prisma.kYC.update({
        where: { userId },
        data: kycPayload,
      });
    }

    return NextResponse.json({ success: true, kyc: result });
  } catch (error: any) {
    console.error("KYC submission error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



