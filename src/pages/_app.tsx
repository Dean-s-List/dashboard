import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
// Solana
import WalletProvider from "@/components/wallet/Provider";
import { HolderProvider } from "@/contexts/holder.context";
// Supabase
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// Contexts/Providers
import { UserProvider } from "@/contexts/user.context";
import { ProjectsContext, ProjectsProvider } from "@/contexts/projects.context";
import { UserAgentProvider } from "@/contexts/agent.context";
// Components
import { ContentContainer } from "@/components/content-container/content-container";
import { Analytics } from "@vercel/analytics/react";

import type { Session } from "@supabase/auth-helpers-react";
import type { Database } from "@/types/supabase";
import type { AppProps } from "next/app";

// Stylesheet
require("@solana/wallet-adapter-react-ui/styles.css");
import "@/styles/globals.css";
import "@/styles/spinner.css";

// Fonts
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
const tt = localFont({
  src: "../styles/fonts/tt.woff2",
  variable: "--font-tt",
});

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  const { projects } = useContext(ProjectsContext);

  const [ua, setUa] = useState<string>("");
  useEffect(() => {
    if (window.navigator.userAgent) setUa(window.navigator.userAgent);
  }, []);

  return (
    <main className={`${tt.variable} ${space.variable}`}>
      <Toaster />
      <WalletProvider>
        <HolderProvider>
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <UserProvider>
              <ProjectsProvider>
                <ContentContainer projects={projects}>
                  <UserAgentProvider userAgent={ua}>
                    <Component {...pageProps} />
                    <Analytics />
                  </UserAgentProvider>
                </ContentContainer>
              </ProjectsProvider>
            </UserProvider>
          </SessionContextProvider>
        </HolderProvider>
      </WalletProvider>
    </main>
  );
};

export default MyApp;
