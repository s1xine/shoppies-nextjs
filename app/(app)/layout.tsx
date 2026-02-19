import Navbar from "@/components/navbar";

function Layout({
  children,
  productViewModal,
}: {
  children: React.ReactNode;
  productViewModal: React.ReactNode;
}) {
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
