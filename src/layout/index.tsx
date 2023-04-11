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
    <div className="text-white relative flex min-h-screen w-full flex-col bg-primary-darker">
      <div className="navbar flex h-[88px] w-[100vw] items-center justify-between self-end bg-primary-dark pl-4 pr-8">
        <label htmlFor="my-drawer" className="relative w-[150px]">
          {/* <Link href={"/"}> */}

          {/* </Link> */}
        </label>

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
