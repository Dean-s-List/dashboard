import { createContext, useState, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import type { PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import type { FindNftsByOwnerOutput } from "@metaplex-foundation/js";
import { COLLECTION_ADDRESS, RPC_URL, HolderEnum } from "@/constants";
import type { ReactNode } from "react";

interface HolderContextType {
  holder: HolderEnum;
}

export const HolderContext = createContext<HolderContextType>({
  holder: HolderEnum.Nay,
});

export const HolderProvider = ({ children }: { children: ReactNode }) => {
  const connection = useMemo(() => new Connection(RPC_URL), []);
  const metaplex = useMemo(() => new Metaplex(connection), [connection]);

  const wallet = useWallet();
  const [holder, setHolder] = useState(HolderEnum.Nay);
  const value = { holder, setHolder };

  useEffect(() => {
    if (wallet.publicKey) {
      const getMPL = async (owner: PublicKey) => {
        await metaplex
          .nfts()
          .findAllByOwner({
            owner,
          })
          .then((userNFT: FindNftsByOwnerOutput) => {
            userNFT.forEach((nft) => {
              // console.log(nft.address.toString());
              if (nft.collection) {
                console.log(nft && nft.collection);
                console.log(
                  "collection address :",
                  nft.collection.address.toString()
                );
                if (nft.collection.address.toString() == COLLECTION_ADDRESS) {
                  setHolder(HolderEnum.Yay);
                } else {
                  setHolder(HolderEnum.Nay);
                }
              }
              // console.log(nft.address.toString());
            });
          });
      };
      getMPL(wallet.publicKey).catch((error) => console.log(error));
    }
  }, [wallet.publicKey, metaplex]);

  return (
    <HolderContext.Provider value={value}>{children}</HolderContext.Provider>
  );
};
