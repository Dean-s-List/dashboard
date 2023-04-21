import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { UserContext } from "@/contexts/user.context";

import Avatar from "@/components/avatar/avatar.component";

import discord from "../../assets/img/discord.svg";
import twitter from "../../assets/img/twitter.svg";
import github from "../../assets/img/github.svg";

import type { Database } from "@/types/supabase";
import type { Profiles } from "@/types";

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!user) throw new Error("No user");

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, avatar_url`)
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session, user, supabase]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: Profiles["username"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget bg-primary-dark pb-8">
      <Avatar
        uid={user!.id}
        url={avatar_url!}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, avatar_url: url });
        }}
      />
      <div className="flex w-full items-center justify-center">
        <span>Feedbacks : {currentUser?.feedback_count}</span>
      </div>
      <div className="form-control w-full md:mt-2">
        <label className="input-group flex w-[100%]" htmlFor="email">
          <span className="w-[50%] text-xs">email</span>
          <input
            type="text"
            placeholder="info@site.com"
            id="email"
            className="input-bordered input w-full  text-xs"
            value={session.user.email}
            disabled
          />
        </label>
      </div>

      <div className="form-control w-full">
        <label className="input-group flex w-[100%]" htmlFor="username">
          <span className="w-[50%] text-xs">username</span>
          <input
            type="text"
            placeholder="ex : d4rks4suk3"
            id="username"
            value={currentUser?.full_name || ""}
            className="input-bordered input w-full text-xs"
            disabled
          />
        </label>
      </div>
      <div className="form-control mt-2 w-full">
        <label className="input-group w-[100%]" htmlFor="discord">
          <span className="w-[50%] text-xs">discord</span>
          <button
            id="discord"
            className="input-bordered input flex w-full items-center justify-center text-xs"
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "discord",
              });
            }}
            disabled={true}
            // disabled={currentUser?.discord_id ? true : false}
          >
            {/* {currentUser?.discord_id || ( */}
            <>
              <Image src={discord} alt="discord" className="mr-2" /> connect
              discord
            </>
            {/* )} */}
          </button>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="input-group w-[100%]" htmlFor="twitter">
          <span className="w-[50%] text-xs">twitter</span>
          <button
            id="twitter"
            className="input-bordered input flex w-full items-center justify-center text-xs"
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "twitter",
              });
            }}
            disabled={true}
            // disabled={currentUser?.twitter_id ? true : false}
          >
            {/* {currentUser?.discord_id || ( */}
            <>
              <Image src={twitter} alt="discord" className="mr-2" /> connect
              twitter
            </>
            {/* )} */}
          </button>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="input-group w-[100%]" htmlFor="twitter">
          <span className="w-[50%] text-xs">github</span>
          <button
            id="github"
            className="input-bordered input flex w-full items-center justify-center text-xs"
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "github",
              });
            }}
            disabled={true}
            // disabled={currentUser?.github_id ? true : false}
          >
            {/* {currentUser?.discord_id || ( */}
            <>
              <Image src={github} alt="discord" className="mr-2" /> connect
              github
            </>
            {/* )} */}
          </button>
        </label>
      </div>

      {/* <div className="mt-4 w-full">
        <button
          className="btn mx-auto block bg-[#6a5acd] hover:bg-[#483D8B]"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div> */}

      {/* <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div> */}
    </div>
  );
}
