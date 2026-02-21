import { syncUser } from "@/actions/users-actions";
import Navbar from "@/components/navbar";

function Layout({
  children,
  productViewModal,
}: {
  children: React.ReactNode;
  productViewModal: React.ReactNode;
}) {
  syncUser(); // clerk alaredy handles auth and we just need to sync the user to our db

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
