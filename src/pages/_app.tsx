import { Toaster } from "react-hot-toast";
// Components
import WalletProvider from "@/components/wallet/Provider";
// Api
import { api } from "@/tools/api";
// Stylesheet
require("@solana/wallet-adapter-react-ui/styles.css");
import "../styles/globals.css";
import "../styles/custom.css";
import "../styles/spinner.css";

// Fonts
import { Space_Grotesk } from "@next/font/google";
import localFont from "@next/font/local";
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
const tt = localFont({
  src: "../styles/fonts/tt.woff2",
  variable: "--font-tt",
});
// Types
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${tt.variable} ${space.variable}`}>
      <Toaster />
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
