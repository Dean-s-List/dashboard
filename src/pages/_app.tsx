import { Toaster } from "react-hot-toast";
// Components
import WalletProvider from "@/components/wallet/Provider";
// Stylesheet
require("@solana/wallet-adapter-react-ui/styles.css");
import "@/styles/globals.css";
import "@/styles/custom.css";
import "@/styles/spinner.css";

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
import { ContentContainer } from "@/components/content-container/content-container";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${tt.variable} ${space.variable}`}>
      <Toaster />
      <WalletProvider>
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
      </WalletProvider>
    </main>
  );
};

export default MyApp;
