"use server";

import { db } from "@/lib/drizzle";
import { usersTable } from "@/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return null;

    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) return null;

    await db
      .insert(usersTable)
      .values({
        clerkId: user.id,
        email,
        name: user.fullName ?? "",
        imageUrl: user.imageUrl ?? null,
      })
      .onConflictDoNothing();

    return user;
  } catch (err) {
    console.log("Clerk not ready yet:", err);
    return null;
  }
}
