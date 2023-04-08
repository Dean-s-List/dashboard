// React
import { useState, useEffect, useContext } from "react";
// Solana
import { useWallet } from "@solana/wallet-adapter-react";
// Layout
import Layout from "@/layout";
// Views
import HomeView from "@/views/home";
// Contexts
import { HolderContext } from "@/contexts/holder.context";
// Types
import type { NextPage } from "next";
import { HolderEnum } from "@/constants";

const Dashboard: NextPage = () => {
  const wallet = useWallet();
  const { holder } = useContext(HolderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(holder);
    setLoading(false);
  }, [wallet.publicKey, holder]);

  return (
    <Layout>
      {!loading && holder === HolderEnum.Yay ? (
        <HomeView />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center">
          Under Construction
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
