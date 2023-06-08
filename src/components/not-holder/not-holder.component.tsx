import Link from "next/link";
import Image from "next/image";

import Wallet from "../wallet";

import solamafm from "../../assets/img/solanafm.png";
import solscan from "../../assets/img/solscan.png";
import explorer from "../../assets/img/explorer.png";
import xray from "../../assets/img/helius_logo.png";

import { COLLECTION_ADDRESS } from "../../constants";

import type { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const NotHolder: FC = () => {
  const { publicKey } = useWallet();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {/* <h1>Sorry.</h1> */}
      {publicKey && (
        <div className="code-font text-md my-1 mx-auto w-96 text-center font-bold">
          no nft found 😞
        </div>
      )}
      {/* <Wallet /> */}

      <p className="code-font my-1 mx-auto w-96 text-center text-xs font-bold">
        you need an NFT to access this content
      </p>
      <p className="code-font my-1 mx-auto w-96 text-center text-xs font-bold">
        collection address :{" "}
        {/* <Link href="https://www.tensor.trade/trade/deanslist"> */}
        <code className="code">{`${COLLECTION_ADDRESS}`}</code>
        {/* </Link> */}
      </p>
      <div className="mt-2 flex items-center justify-center space-x-4">
        <Link href={`https://solana.fm/address/${COLLECTION_ADDRESS}`}>
          <Image
            src={solamafm}
            width={12}
            height={12}
            alt={``}
            className="rounded-full"
          />
        </Link>
        <Link href={`https://solscan.io/token/${COLLECTION_ADDRESS}`}>
          <Image
            src={solscan}
            width={16}
            height={16}
            alt={``}
            className="rounded-full"
          />
        </Link>
        <Link
          href={`https://explorer.solana.com/address/${COLLECTION_ADDRESS}`}
        >
          <Image
            src={explorer}
            width={20}
            height={20}
            alt={``}
            className="rounded p-1"
          />
        </Link>
        <Link href={`https://xray.helius.xyz/token/${COLLECTION_ADDRESS}`}>
          <Image
            src={xray}
            width={18}
            height={18}
            alt={``}
            className="rounded-full"
          />
        </Link>
      </div>

      <div>
        <p className="code-font my-4 mx-auto w-96 text-center text-xs font-bold">
          <Link
            href="https://www.tensor.trade/trade/deanslist"
            className="btn-primary btn-sm btn lowercase"
          >
            view listings
          </Link>
        </p>
      </div>
    </div>
  );
};
