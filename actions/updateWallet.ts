// app/actions/updateWallet.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Decimal } from "@prisma/client/runtime/library";
import { headers } from "next/headers";

export async function updateWalletAction(amount: number) {
  
  // Retrieve the session from the cookies
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    throw new Error("Unauthorized");
  }
  
  const userId = session.user.id;
  
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Invalid amount provided");
  }
  
  // Convert the amount to a Decimal for precision
  const depositAmount = new Decimal(amount.toString());
  
  let wallet = await prisma.wallet.findUnique({ where: { userId } });
  
  if (!wallet) {
    // If no wallet exists, create one with the deposit amount as the initial balance
    wallet = await prisma.wallet.create({
      data: {
        userId,
        balance: depositAmount,
        currency: "NGN",
      },
    });
  } else {
    // If the wallet exists, increment the balance
    wallet = await prisma.wallet.update({
      where: { userId },
      data: {
        balance: { increment: depositAmount },
      },
    });
  }
  
  return wallet;
}
