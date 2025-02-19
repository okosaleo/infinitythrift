// app/actions/updateWallet.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Decimal } from "@prisma/client/runtime/library";
import { headers } from "next/headers";

export async function updateWalletAction(amount: number) {
  console.log("Starting updateWalletAction");

  // Retrieve the session from the request headers
  const reqHeaders = await headers();
  console.log("Request headers:", reqHeaders.get("cookie"));
  
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });
  console.log("Session obtained:", session);

  if (!session) {
    console.error("Unauthorized: No session found");
    throw new Error("Unauthorized");
  }
  
  const userId = session.user.id;
  console.log("User ID from session:", userId);

  // Validate the deposit amount
  if (typeof amount !== "number" || amount <= 0) {
    console.error("Invalid amount provided:", amount);
    throw new Error("Invalid amount provided");
  }
  
  // Convert the amount to a Decimal for precision
  const depositAmount = new Decimal(amount.toString());
  console.log("Converted deposit amount to Decimal:", depositAmount.toString());
  
  // Attempt to find an existing wallet for the user
  let wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (wallet) {
    console.log("Existing wallet found with balance:", wallet.balance.toString());
  } else {
    console.log("No wallet found for user. Proceeding to create a new wallet.");
  }
  
  if (!wallet) {
    // Create a new wallet if it doesn't exist
    wallet = await prisma.wallet.create({
      data: {
        userId,
        balance: depositAmount,
        currency: "NGN",
      },
    });
    console.log("Created new wallet with balance:", wallet.balance.toString());
  } else {
    // Otherwise, update the existing wallet by incrementing its balance
    wallet = await prisma.wallet.update({
      where: { userId },
      data: {
        balance: {
          increment: depositAmount,
        },
      },
    });
    console.log("Updated wallet new balance:", wallet.balance.toString());
  }
  
  console.log("Returning wallet:", wallet);
  return wallet;
}

