// React
import { useState, useEffect } from "react";
// Solana
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
// Components
import Layout from "@/views/Layout";
import SideBar from "@/views/SideBar";
import MainFrame from "@/views/MainFrame";
import RightPanel from "@/views/RightPanel";
// Tools
import { Hodl } from "@/tools/hodl";
// Constants
import { TOKEN_GATE_PUBKEY } from "@/constants";
// Types
import type { NextPage } from "next";
import { Holder } from "@/types";

const Dashboard: NextPage = () => {
  const { publicKey } = useWallet();
  // States
  const [loading, setLoading] = useState(true);
  const [holder, setHolder] = useState<Holder>(Holder.Nay);

  useEffect(() => {
    if (publicKey) {
      const userPubkey = new PublicKey(publicKey);
      Hodl({ userPubkey, tokenPubkey: TOKEN_GATE_PUBKEY })
        .then((holder: Holder) => {
          setHolder(holder);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [publicKey]);
  return (
    <Layout>
      <div className="max-w-screen flex min-h-[80vh] w-[100%] bg-[#171717]">
        {holder === Holder.Yay ? (
          <>
            <SideBar />
            <MainFrame />
            <RightPanel />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-center">
            Under Construction
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
