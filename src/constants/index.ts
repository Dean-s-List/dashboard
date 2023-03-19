import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const endpoint = clusterApiUrl("devnet");
const connection = new Connection(endpoint, "confirmed");

const USDC_MINT = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const TREASURY_MINT = new PublicKey(
  "AQiszckBeysWtwZ5YN9pMy1dDTs4jLMHxwui743ubGj2"
);

export { endpoint, connection, USDC_MINT, TREASURY_MINT };

export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string || "https://rpc.ankr.com/solana";

export const TOKEN_GATE_PUBKEY = new PublicKey(
  (process.env.NEXT_PUBLIC_TOKEN_GATE_ADDRESS as string) ||
    "8KEXE7rw4T8RYmCkk566efv54aeqG7fR9M7iiM4MUtvW"
);

export const CANDY_MACHINE_ID = process.env
  .NEXT_PUBLIC_CANDY_MACHINE_ID as string;
