// Next
import Link from "next/link";
// Solana SDK
import { useWallet } from "@solana/wallet-adapter-react";
// Components
import Wallet from "@/components/wallet";
// Utils
import Image from "next/image";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { publicKey } = useWallet();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-primary-darker text-white">
      <div className="flex h-[67.5px] w-full items-center justify-between pl-4 pr-8 font-tt text-3xl bg-primary-dark">
        <Link href={"/"}>
          <Image
            src={"/images/logo-dl.png"}
            width={150}
            height={150}
            alt="Dean's List Logo"
          />
        </Link>
        {publicKey && <Wallet />}
      </div>
      {!publicKey ? (
        <div className="flex w-full flex-grow items-center justify-center">
          <Wallet />
        </div>
      ) : (
        <div className="flex w-full flex-grow">{children}</div>
      )}
    </div>
  );
};

export default Layout;
