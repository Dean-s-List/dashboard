import { Connection, PublicKey } from "@solana/web3.js";

import { RPC_URL, HolderEnum } from "@/constants";

export const Hodl = async ({
  userPubkey,
  tokenPubkey,
}: {
  userPubkey: PublicKey;
  tokenPubkey: PublicKey;
}): Promise<HolderEnum> => {
  const connection = new Connection(RPC_URL, "confirmed");
  const ownerPublicKey = new PublicKey(userPubkey);

  const balance = await connection.getParsedTokenAccountsByOwner(
    ownerPublicKey,
    {
      mint: tokenPubkey,
    }
  );

  // console.log(balance);

  // if user has 1 token acc, Yay!
  if (balance.value.length == 1) {
    return HolderEnum.Yay;
    // else, Nay.
  } else return HolderEnum.Nay;
};
