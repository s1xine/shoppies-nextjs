import "./globals.admin.css";

export const metadata = {
  title: "Shoppies Admin",
  description: "Admin panel for managing Shoppies store",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-panel">{children}</div>;
}
