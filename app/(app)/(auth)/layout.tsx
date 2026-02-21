import { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default AuthLayout;
