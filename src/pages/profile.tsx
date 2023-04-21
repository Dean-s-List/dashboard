import { useSession } from "@supabase/auth-helpers-react";
import Layout from "@/layout";
import Account from "@/components/account/account.component";
import type { NextPage } from "next";

const Profile: NextPage = () => {
  const session = useSession();
  return (
    <Layout>
      {session && (
        <div className="flex h-[calc(100vh-67.5px)] w-screen flex-col items-center justify-center border-t border-l border-primary bg-primary-dark md:w-full">
          <Account session={session} />
        </div>
      )}
    </Layout>
  );
};

export default Profile;
