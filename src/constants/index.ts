import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const endpoint = clusterApiUrl("devnet");
const connection = new Connection(endpoint, "confirmed");

const USDC_MINT = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const TREASURY_MINT = new PublicKey(
  "AQiszckBeysWtwZ5YN9pMy1dDTs4jLMHxwui743ubGj2"
);

export { endpoint, connection, USDC_MINT, TREASURY_MINT };

export const RPC_URL = process.env.RPC_URL as string;

export const TOKEN_GATE_PUBKEY = new PublicKey(
  (process.env.TOKEN_GATE_ADDRESS as string) ||
    "6LyW1iUpfTPiMxSLMpKCxeAqXDz7nuWCfCNnEaSmibZ1"
);
