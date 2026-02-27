import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/_lib/admin-auth";
import { AdminSidebar } from "../_components/admin-sidebar";
import { MobileAdminNav } from "../_components/mobile-admin-nav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) redirect("/admin/login");

  return (
    <div className="flex h-screen bg-(--admin-bg) p-4 gap-4 overflow-hidden relative">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-(--admin-card) rounded-2xl border border-(--admin-border) shadow-sm overflow-hidden mb-20 lg:mb-0">
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 shrink-0">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
      <MobileAdminNav />
    </div>
  );
}
