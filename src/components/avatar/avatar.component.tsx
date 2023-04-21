/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserContext } from "@/contexts/user.context";

import type { Database } from "@/types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const { currentUser } = useContext(UserContext);

  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url).catch((error) => console.log(error));
  }, [url, supabase.storage]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0]!;
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt!}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-primary-dark py-8 md:rounded-t-lg">
      {currentUser ? (
        <Image
          src={`${
            currentUser.avatar_url.startsWith("https://")
              ? currentUser.avatar_url
              : (process.env.NEXT_PUBLIC_SUPABASE_URL as string) +
                "/storage/v1/object/public/avatars/" +
                currentUser.avatar_url
          }`}
          className="image avatar mx-auto rounded-md border border-primary shadow-xl"
          width={150}
          height={150}
          alt="Avatar"
        />
      ) : (
        <div
          className="no-image avatar"
          style={{ height: size, width: size }}
        />
      )}
      <div
        style={{ width: size }}
        className="flex w-full items-center justify-center"
      >
        <label
          className="btn mt-4 self-center bg-[#6a5acd] hover:bg-[#483D8B]"
          htmlFor="single"
        >
          <div>{uploading ? "Uploading ..." : "Upload"}</div>
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
