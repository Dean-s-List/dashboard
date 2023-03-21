import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { MetaplexContext } from "./MetaplexContext";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export const MetaplexProvider = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const metaplex = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
    [connection, wallet]
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
  );
};
