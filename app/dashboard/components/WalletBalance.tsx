"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function WalletBalance() {
  const { data, error } = useSWR("/api/getWallet", fetcher);

  if (error) return <div className="text-text-button">Error</div>;
  if (!data) return <div className="text-text-button">...</div>;

  // Additional check for wallet existence
  if (!data.wallet) return <div className="text-text-button font-medium">₦0.00</div>;

  return (
    <div className="text-text-button">
      <h2 className="font-medium">
        ₦{data.wallet.balance}
      </h2>
    </div>
  );
}
