import SyncUserClient from "@/components/auth/sync-user-client";
import Navbar from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

function Layout({
  children,
  productViewModal,
}: {
  children: React.ReactNode;
  productViewModal: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      <SyncUserClient />
      <Navbar />

      <main>{children}</main>
      {productViewModal}
    </ClerkProvider>
  );
}

export default Layout;
