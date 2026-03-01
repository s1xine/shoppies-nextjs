import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/_lib/admin-auth";

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  // If already authenticated, redirect to dashboard
  const isAuth = await isAdminAuthenticated();
  if (isAuth) redirect("/admin");

  return <>{children}</>;
}
