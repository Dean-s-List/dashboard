// React
import { useState, useEffect } from "react";
// Solana
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
// Hooks
import { useMetaplex } from "@/contexts/MetaplexContext";
// Views
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
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  // States
  const [loading, setLoading] = useState(true);
  const [holder, setHolder] = useState<Holder>(Holder.Nay);

  const [nft, setNft] = useState(null);

  useEffect(() => {
    if (wallet.publicKey) {
      const userPubkey = new PublicKey(wallet.publicKey);
      Hodl({ userPubkey, tokenPubkey: TOKEN_GATE_PUBKEY })
        .then((holder: Holder) => {
          setHolder(holder);
          console.log(holder)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [wallet.publicKey]);

  return (
    <Layout>
      <div className="max-w-screen flex min-h-[80vh] w-[100%] bg-[#171717]">
        {holder === Holder.Yay ? (
          <>
            <SideBar />
            <MainFrame />
            <div className="hidden md:flex">
              <RightPanel />
            </div>
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
