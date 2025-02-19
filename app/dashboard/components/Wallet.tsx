"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { PaystackConsumer } from "react-paystack";
import { unstable_noStore as noStore } from "next/cache";
import { mutate } from "swr";

interface iAppProps {
  email: string | undefined;
}

export default function WalletPage({ email}: iAppProps) {
  noStore();
  const [nairaAmount, setNairaAmount] = useState("");

  // Redirect if not logged in
  if (!email) {
    redirect("/sign-in");
  }

  // Update state as user types
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNairaAmount(e.target.value);
  };

  // This function is called when the payment is successful
  const handleSuccess = (reference: any) => {
    console.log("Payment successful with reference:", reference);

    // Call backend API to update wallet balance
    fetch("/api/updateWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        amount: parseFloat(nairaAmount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Wallet updated successfully:", data);
        // Manually revalidate SWR data for /api/getWallet so that the UI updates immediately
        mutate("/api/getWallet");
      })
      .catch((error) => {
        console.error("Error updating wallet:", error);
      });
  };

  // Called when the Paystack dialog is closed without completion
  const handleClose = () => {
    console.log("Payment dialog closed");
  };

  // Paystack configuration. Multiply the Naira amount by 100 to convert to kobo.
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: nairaAmount ? parseInt(nairaAmount, 10) * 100 : 0,
    publicKey: "pk_test_1e4c54a2aeb0beb74783089c92cdcd8f51b97689",
  };

  // Component props for PaystackConsumer
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
  };

  return (
    <div className="flex items-start w-full">
      <Dialog>
        <DialogTrigger className="w-1/2">
          <button className="bg-[#a79e9ea6] text-[12px] p-1 flex items-center w-full rounded-md text-primary-day justify-center">
            <Plus className="size-4" />Deposit
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Fund your Wallet With:</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-center">
            <Input
              type="number"
              placeholder="Enter amount in Naira"
              value={nairaAmount}
              onChange={handleAmountChange}
              className="border rounded p-2 w-full"
            />
            <PaystackConsumer {...componentProps}>
              {({ initializePayment }) => (
                <button
                  className="bg-active-nav flex items-center justify-center w-full p-2 border border-primary-day rounded-md"
                  onClick={() => {
                    if (nairaAmount && parseFloat(nairaAmount) > 0) {
                      initializePayment(handleSuccess, handleClose);
                    } else {
                      alert("Please enter a valid amount in Naira");
                    }
                  }}
                  disabled={!nairaAmount || parseFloat(nairaAmount) <= 0}
                >
                  <Image src="/img/paystack.png" alt="Paystack Image" width={90} height={30} />
                </button>
              )}
            </PaystackConsumer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

