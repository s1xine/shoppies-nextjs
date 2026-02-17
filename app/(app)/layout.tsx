import { syncUser } from "@/actions/users-actions";
import Navbar from "@/components/navbar";

async function Layout({
  children,
  productViewModal,
}: {
  children: React.ReactNode;
  productViewModal: React.ReactNode;
}) {
  await syncUser();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main>{children}</main>
      {productViewModal}
    </>
  );
}

export default Layout;
