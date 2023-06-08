import Head from "next/head";
import { useSession } from "@supabase/auth-helpers-react";
import Account from "@/components/account/account.component";
import type { NextPage } from "next";
import Gated from "@/components/gated/gated.component";

const Profile: NextPage = () => {
  const session = useSession();
  return (
    <>
      <Head>
        <title>Dean&apos;s List | Profile</title>
        <meta property="og:title" content="Dean's List | Profile" />
        <meta property="og:site_name" content="Dean's List" />
        <meta property="og:url" content="https://app.deanslist.services/" />
        <meta
          property="og:description"
          content="Service DAO improving the Web3 ecosystem one feedback at the time."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Deans-List/dashboard/main/public/images/dl_embed.png"
        />
      </Head>
      <Gated>
        {session && (
          <div className="flex h-[calc(100vh-67.5px)] w-screen flex-col items-center justify-center border-t border-l border-primary bg-primary-dark md:w-full">
            <Account session={session} />
          </div>
        )}
      </Gated>
    </>
  );
};

export default Profile;
