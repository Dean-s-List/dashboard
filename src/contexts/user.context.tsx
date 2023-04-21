import React, { createContext, useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
// import { onAuthStateChangeListener } from "@/tools/supabase";
import type { Database } from "@/types/supabase";
import type { Profiles, Admin } from "@/types";
import type { SetStateAction, ReactNode } from "react";

interface UserContext {
  currentUser: Profiles | null;
  setCurrentUser: React.Dispatch<SetStateAction<Profiles | null>> | null;
  isAdmin: boolean;
}

export const UserContext = createContext<UserContext>({
  currentUser: null,
  setCurrentUser: () => null,
  isAdmin: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [currentUser, setCurrentUser] = useState<Profiles | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const value = { currentUser, setCurrentUser, supabase, isAdmin };

  useEffect(() => {
    async function getProfile() {
      if (!user) throw new Error("No user");

      return await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();
    }
    if (user)
      getProfile()
        .then(({ data }) => {
          if (data) {
            setCurrentUser(data);
            console.log("avatar_url from context :", data.avatar_url);
          }
        })
        .catch((error) => console.log(error));
  }, [user, supabase]);

  useEffect(() => {
    async function checkPriviledges(userId: string) {
      if (!user) throw new Error("No user");

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("id", userId)
        .single();
      if (data) return data;
      if (error) console.log(error);
    }
    if (user)
      checkPriviledges(user.id)
        .then((admin) => {
          if (admin) setAdmin(admin);
        })
        .catch((error) => console.log(error));
  }, [user, supabase]);

  useEffect(() => {
    if (admin) {
      setIsAdmin(true);
    }
  }, [admin]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
