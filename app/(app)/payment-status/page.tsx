// app/(app)/payment-status/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Package,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );

  useEffect(() => {
    if (!orderId) {
      const timer = setTimeout(() => setStatus("failed"), 0);
      return () => clearTimeout(timer);
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        if (data.status === "paid") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification Error:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [orderId]);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <h2 className="text-xl font-medium text-zinc-600">
          Verifying your payment...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-10 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
        {status === "success" ? (
          <>
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Thank you for your purchase. Your order has been confirmed and is
              being processed.
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 mb-8 text-left border border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-500">Order ID:</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-white">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Paid
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-base shadow-lg shadow-emerald-200 dark:shadow-none"
              >
                <Link href="/orders">
                  <Package className="w-5 h-5" />
                  View My Orders
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full h-12 rounded-xl text-zinc-600 dark:text-zinc-400 gap-2"
              >
                <Link href="/">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Payment Failed
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Something went wrong during the payment process. If money was
              deducted, it will be refunded within 5-7 working days.
            </p>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-base"
              >
                <Link href="/cart">Return to Cart</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full h-12 rounded-xl text-zinc-600 dark:text-zinc-400 gap-2"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
