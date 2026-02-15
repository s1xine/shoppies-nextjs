import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Proxy fetch failed:", res.status);
      return NextResponse.json([]);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy crashed:", err);
    return NextResponse.json([]);
  }
}
