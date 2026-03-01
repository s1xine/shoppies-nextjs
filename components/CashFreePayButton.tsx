// components/CashFreePayButton.tsx
"use client";

import { useCashfree } from "@/lib/hooks/useCashfree";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2, Lock } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface CashfreePayButtonProps {
  amount: number;
}

export default function CashfreePayButton({ amount }: CashfreePayButtonProps) {
  const cashfree = useCashfree();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handlePay = async () => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/create-cashfree-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          customerId: user.id,
          customerEmail: user.primaryEmailAddress?.emailAddress,
          customerPhone: user.primaryPhoneNumber?.phoneNumber || "9876543210", // Fallback for testing
          customerName: user.fullName || user.username || "Customer",
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok || !data.paymentSessionId) {
        toast.error(data.error || "Order creation failed");
        return;
      }

      console.log(typeof cashfree);

      if (typeof cashfree !== "function") {
        toast.error("Cashfree SDK not ready. Please refresh.");
        return;
      }

      const cfInstance = cashfree({
        mode:
          process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
            ? "production"
            : "sandbox",
      });

      await cfInstance.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error("Payment failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePay}
      disabled={loading || amount <= 0}
      className="w-full h-14 rounded-2xl text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition gap-2 shadow-lg shadow-emerald-200 dark:shadow-none"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Lock className="mr-2 h-4 w-4" />
      )}

      {loading ? "Initializing..." : "Secure Checkout"}
    </Button>
  );
}
