import { useContext } from "react";
// Solana SDK
import { useWallet } from "@solana/wallet-adapter-react";
// Supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// Contexts
import { UserContext } from "@/contexts/user.context";
// Components
import Navbar from "@/components/navbar/navbar.component";
import type { ReactNode } from "react";

import type { Database } from "@/types/supabase";
import Spinner from "@/components/spinner/Spinner";

require("@solana/wallet-adapter-react-ui/styles.css");

const Layout = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const supabase = useSupabaseClient<Database>();

  if (!supabase) return <Spinner />;

  return (
    <div className="text-white relative flex min-h-screen w-full flex-col bg-primary-darker">
      {currentUser && setCurrentUser && (
        <Navbar
          wallet={wallet}
          currentUser={currentUser}
          supabase={supabase}
          setCurrentUser={setCurrentUser}
        />
      )}

      <div className="flex w-full flex-grow items-center justify-center">
        {!currentUser ? (
          <Auth
            redirectTo={`${
              (process.env.NEXT_PUBLIC_URL as string) || "http://localhost:3000"
            }`}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "slateblue",
                    brandAccent: "darkslateblue",
                  },
                },
              },
            }}
            supabaseClient={supabase}
            // providers={["discord", "twitter", "github"]}
            providers={["discord"]}
            socialLayout="horizontal"
          />
        ) : (
          <div className="flex w-full flex-grow">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Layout;
