"use server";

import { db } from "@/lib/drizzle";
import { usersTable } from "@/schema";
import { DbUser } from "@/types/user";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncAuthUser() {
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

    return { success: true };
  } catch (err) {
    console.error("Clerk not ready yet:", err);
    return null;
  }
}

export async function checkDbUser(): Promise<DbUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const dbUser = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.clerkId, userId),
  });

  return dbUser ?? null;
}
