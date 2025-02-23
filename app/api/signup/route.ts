// app/api/signup/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; // your Prisma client
import { signUpSchema } from "@/lib/zodSchemas";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming JSON payload
    const body = await req.json();
    const data = signUpSchema.parse(body);

    // Create the user via your auth client.
    // Notice that the returned object is a union type where the user is inside newUser.user.
    const newUser = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    // Extract the new user's ID from the nested object.
    const newUserId = newUser.user.id;

    // Process referral if a referral code was provided
    if (data.referralCode) {
      // Find a referrer by checking if their ID starts with the referral code.
      const referrer = await prisma.user.findFirst({
        where: { id: { startsWith: data.referralCode } },
      });

      if (referrer) {
        // Check if a referral record already exists for this new user for the referrer.
        const existingReferral = await prisma.referral.findFirst({
          where: {
            referrerId: referrer.id,
            referredUserName: data.name, // or use newUserId if you store that instead
          },
        });

        if (!existingReferral) {
          // Optionally update the new user's referredBy field
          await prisma.user.update({
            where: { id: newUserId },
            data: { referredBy: referrer.id },
          });

          // Log the referral event
          await prisma.referral.create({
            data: {
              referrerId: referrer.id,
              referredUserName: data.name,
            },
          });
        }
      }
    }

    // Return a successful JSON response
    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    console.error("Sign up error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

