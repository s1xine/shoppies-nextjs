import SyncUserClient from "@/components/auth/sync-user-client";
import Navbar from "@/components/navbar/navbar";

function Layout({
  children,
  productViewModal,
}: {
  children: React.ReactNode;
  productViewModal: React.ReactNode;
}) {
  return (
    <>
      <SyncUserClient />
      <Navbar />

      <main>{children}</main>
      {productViewModal}
    </>
  );
}

export default Layout;
