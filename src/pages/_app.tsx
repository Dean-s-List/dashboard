import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
// Supabase
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { getAllProjects } from "@/tools/supabase";
// Components
import WalletProvider from "@/components/wallet/Provider";
import { ContentContainer } from "@/components/content-container/content-container";
// import { HolderProvider } from "@/contexts/holder.context";
import { UserProvider } from "@/contexts/user.context";
import { UserAgentProvider } from "@/contexts/agent.context";
import { ProjectsContext, ProjectsProvider } from "@/contexts/projects.context";

// Stylesheet
require("@solana/wallet-adapter-react-ui/styles.css");
import "@/styles/globals.css";
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
// import type { AppType } from "next/dist/shared/lib/utils";
import type { Database } from "@/types/supabase";

import type { Projects } from "@/types";
import type { AppProps } from "next/app";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) => {
  const [loading, setLoading] = useState(true);
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  const { projects } = useContext(ProjectsContext);

  const [ua, setUa] = useState<string>("");
  useEffect(() => {
    if (window.navigator.userAgent) setUa(window.navigator.userAgent);
  }, []);
  useEffect(() => {
    if (projects) setLoading(false);
  }, [projects]);

  return (
    <main className={`${tt.variable} ${space.variable}`}>
      <Toaster />
      <WalletProvider>
        {/* <HolderProvider> */}
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <UserProvider>
            <ProjectsProvider>
              <ContentContainer projects={projects}>
                <UserAgentProvider userAgent={ua}>
                  <Component {...pageProps} />
                </UserAgentProvider>
              </ContentContainer>
            </ProjectsProvider>
          </UserProvider>
        </SessionContextProvider>
        {/* </HolderProvider> */}
      </WalletProvider>
    </main>
  );
};

export default MyApp;
