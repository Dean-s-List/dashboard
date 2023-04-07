// React
import { useState, useEffect } from "react";
// Solana
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
// Metaplex
import { Metaplex } from "@metaplex-foundation/js";
// Views
import Layout from "@/layout";
// Constants
import { COLLECTION_ADDRESS, RPC_URL } from "@/constants";
// Types
import { HolderEnum } from "@/constants";
import type { NextPage } from "next";
import HomeView from "@/views/home";

const connection = new Connection(RPC_URL);

const Dashboard: NextPage = () => {
  const wallet = useWallet();
  // States
  const [loading, setLoading] = useState(true);
  const [holder, setHolder] = useState<HolderEnum>(HolderEnum.Nay);

  useEffect(() => {
    if (wallet.publicKey) {
      fetchUserNFTs(wallet.publicKey)
        .then(() => setLoading(false))
        .catch((error) => console.log(error));
    }
  }, [wallet.publicKey]);

  const fetchUserNFTs = async (userPubkey: PublicKey) => {
    const metaplex = new Metaplex(connection);
    const myNFTs = await metaplex.nfts().findAllByOwner({
      owner: new PublicKey(userPubkey),
    });
    myNFTs.forEach((nft) => {
      // console.log(nft.address.toString());
      if (nft.collection) {
        console.log(nft && nft.collection);
        console.log("collection address :", nft.collection.address.toString());
        if (nft.collection.address.toString() == COLLECTION_ADDRESS) {
          setHolder(HolderEnum.Yay);
        }
      }
      // console.log(nft.address.toString());
    });
  };

  return (
    <Layout>
      {!loading && holder === HolderEnum.Nay ? (
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
