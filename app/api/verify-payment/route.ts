// app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { ordersTable } from "@/schema";
import { eq } from "drizzle-orm";

const SANDBOX_BASE = "https://sandbox.cashfree.com/pg";
const PRODUCTION_BASE = "https://api.cashfree.com/pg";

const CF_BASE =
  process.env.CASHFREE_API_ENV === "production"
    ? PRODUCTION_BASE
    : SANDBOX_BASE;

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    // 1. Fetch order status from Cashfree
    const res = await fetch(`${CF_BASE}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_CLIENT_ID as string,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET as string,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    const cashfreeStatus = data.order_status; // PAID, ACTIVE, EXPIRED, etc.

    // 2. Update status in our database
    let mappedStatus: "paid" | "pending" | "cancelled" | "cart" = "pending";
    if (cashfreeStatus === "PAID") {
      mappedStatus = "paid";
    } else if (cashfreeStatus === "CANCELLED" || cashfreeStatus === "EXPIRED") {
      mappedStatus = "cancelled";
    }

    await db
      .update(ordersTable)
      .set({ status: mappedStatus })
      .where(eq(ordersTable.cashfreeOrderId, orderId));

    return NextResponse.json({
      status: mappedStatus,
      cashfreeStatus: cashfreeStatus,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Verification Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
