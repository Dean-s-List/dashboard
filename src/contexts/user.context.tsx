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
    if (user) {
      async function loadProfile(userId: string) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        if (data) return data;
        if (error) console.log(error);
      }
      if (user) {
        loadProfile(user.id)
          .then((profile) => {
            if (profile) setCurrentUser(profile);
          })
          .catch((error) => console.log(error));
      } else {
        setCurrentUser(null);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      async function checkPriviledges(userId: string) {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("id", userId)
          .single();
        if (data) return data;
        if (error) console.log(error);
      }
      if (user) {
        checkPriviledges(user.id)
          .then((admin) => {
            if (admin) setAdmin(admin);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [user]);

  useEffect(() => {
    if (admin) {
      setIsAdmin(true);
    }
  }, [admin]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
