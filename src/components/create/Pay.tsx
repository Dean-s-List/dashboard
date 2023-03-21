// Dependencies
import toast from "react-hot-toast";
// Solana SDK
import {
  getAssociatedTokenAddressSync,
  getMint,
  createTransferCheckedInstruction,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
// Utils
// Constants
import { USDC_MINT, TREASURY_MINT, connection } from "@/constants";
// Types
import type { Dispatch, SetStateAction } from "react";

const Pay = ({
  enabled,
  price,
  setTransaction,
}: {
  enabled: boolean;
  price: number;
  setTransaction: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { publicKey, sendTransaction } = useWallet();

  const pay = () => {
    (async () => {
      const fromATA = getAssociatedTokenAddressSync(USDC_MINT, publicKey!);
      const toATA = getAssociatedTokenAddressSync(USDC_MINT, TREASURY_MINT);

      const mint = await getMint(connection, USDC_MINT);

      console.log(mint.decimals);

      const blockhash = await connection.getLatestBlockhash("confirmed");
      const transaction = new Transaction({
        recentBlockhash: blockhash.blockhash,
      }).add(
        createTransferCheckedInstruction(
          fromATA,
          USDC_MINT,
          toATA,
          publicKey!,
          price * 10 ** mint.decimals,
          mint.decimals
        )
      );

      const hash = await sendTransaction(transaction, connection);
      setTransaction(hash);
    })().catch((err) => {
      console.log(err);
      toast.error("An Error Occoured");
    });
  };

  return (
    <div className="mt-16 mb-14 w-full max-w-md">
      <button
        className={`h-12 w-full rounded bg-white font-tt text-lg uppercase text-black disabled:cursor-not-allowed`}
        disabled={!!enabled}
        onClick={pay}
      >
        Pay
      </button>
    </div>
  );
};

export default Pay;
