import Navbar from "@/components/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main>{children}</main>
    </>
  );
}

export default Layout;
