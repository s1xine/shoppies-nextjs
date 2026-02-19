import { UserProfile } from "@clerk/nextjs";
import { Suspense } from "react";

const AccountPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <Suspense>
          <UserProfile />
        </Suspense>
      </div>
    </div>
  );
};

export default AccountPage;
