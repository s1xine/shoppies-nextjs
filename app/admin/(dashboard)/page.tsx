import { AdminHeader } from "../_components/admin-header";
import { DashboardClient } from "../_components/dashboard-client";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your store performance"
      />
      <DashboardClient />
    </>
  );
}
