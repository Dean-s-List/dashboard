import React, { createContext, useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/types/supabase";
import type { Profiles, Admin } from "@/types";
import type { ReactNode } from "react";
import { updateRecord } from "@/tools/supabase";

interface UserContext {
  currentUser: Profiles | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Profiles | null>> | null;
  isAdmin: boolean;
  adminUI: boolean;
  toogleAdmin: () => null;
}

export const UserContext = createContext<UserContext>({
  currentUser: null,
  setCurrentUser: () => null,
  isAdmin: false,
  adminUI: false,
  toogleAdmin: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [currentUser, setCurrentUser] = useState<Profiles | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUI, setAdminUI] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [discord, setDiscord] = useState<string>("");

  const toogleAdmin = () => {
    if (isAdmin) {
      setAdminUI(!adminUI);
    }
    return null;
  };
  const value = {
    currentUser,
    setCurrentUser,
    isAdmin,
    adminUI,
    toogleAdmin,
  };

  useEffect(() => {
    async function getProfile() {
      if (!user) throw new Error("No user");

      return await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();
    }
    if (user) {
      console.log(user);
      getProfile()
        .then(({ data }) => {
          if (data) {
            setCurrentUser(data);
            console.log("avatar_url from context :", data.avatar_url);
          }
        })
        .catch((error) => console.log(error));
    }
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

  useEffect(() => {
    async function updateDiscord() {
      if (!user) throw new Error("No user");

      await updateRecord(currentUser!, "profiles");
    }
    if (
      user &&
      user.app_metadata.provider == "discord" &&
      user.user_metadata.provider_id
    ) {
      setDiscord(user.user_metadata.provider_id as string);
      if (discord && currentUser) {
        console.log(discord);
        currentUser.discord_id = parseInt(discord);
        updateDiscord()
          .then(() => console.log(currentUser))
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [user, discord, currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
