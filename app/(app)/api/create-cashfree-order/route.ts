// app/api/create-cashfree-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { ordersTable, orderItemsTable } from "@/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

const SANDBOX_BASE = "https://sandbox.cashfree.com/pg";
const PRODUCTION_BASE = "https://api.cashfree.com/pg";

const CF_BASE =
  process.env.CASHFREE_API_ENV === "production"
    ? PRODUCTION_BASE
    : SANDBOX_BASE;

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { customerId, customerName, customerEmail, customerPhone } =
      await req.json();

    // 1. Get the DB user
    const dbUser = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.clerkId, clerkId),
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 },
      );
    }

    // 2. Find active "cart" order
    const cartOrder = await db.query.ordersTable.findFirst({
      where: (orders, { eq, and }) =>
        and(eq(orders.userId, dbUser.id), eq(orders.status, "cart")),
    });

    if (!cartOrder) {
      return NextResponse.json(
        { error: "No active cart found" },
        { status: 400 },
      );
    }

    // Calculate actual total from order items
    const orderItems = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.orderId, cartOrder.id));

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + (item.subtotal || 0),
      0,
    );

    if (totalAmount <= 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3. Create Order in Cashfree
    const cashfreeOrderId = `order_${cartOrder.id}_${Date.now()}`;

    const payload = {
      order_id: cashfreeOrderId,
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId ?? `user_${dbUser.id}`,
        customer_name: customerName ?? dbUser.name ?? "Customer",
        customer_email: customerEmail ?? dbUser.email,
        customer_phone: customerPhone ?? "9876543210", // Fallback for testing
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?order_id={order_id}`,
      },
    };

    const res = await fetch(`${CF_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_CLIENT_ID as string,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET as string,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();

    // 4. Update our DB order
    await db
      .update(ordersTable)
      .set({
        cashfreeOrderId: data.order_id,
        paymentSessionId: data.payment_session_id,
        totalAmount: totalAmount,
        status: "pending",
      })
      .where(eq(ordersTable.id, cartOrder.id));

    return NextResponse.json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Cashfree API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
