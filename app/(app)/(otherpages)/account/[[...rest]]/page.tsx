import { UserProfile } from "@clerk/nextjs";

const AccountPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </div>
  );
};

export default AccountPage;
