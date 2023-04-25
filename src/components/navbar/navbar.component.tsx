import React from "react";
import Link from "next/link";

import Wallet from "../wallet";
import type { Profiles } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import type { FC, SetStateAction } from "react";
import Image from "next/image";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

type Props = {
  currentUser: Profiles;
  isAdmin: boolean;
  adminUI: boolean;
  toogleAdmin: () => null;
  setCurrentUser: React.Dispatch<SetStateAction<Profiles | null>>;
  wallet: WalletContextState;
  supabase: SupabaseClient;
};

const Navbar: FC<Props> = ({
  currentUser,
  isAdmin,
  adminUI,
  toogleAdmin,
  wallet,
  supabase,
  setCurrentUser,
}) => (
  <div className="navbar bg-primary-dark">
    <div className="hidden md:flex md:flex-1">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search or type a word"
          className="input-bordered input w-96"
        />
      </div>
    </div>
    {isAdmin && (
      <div
        className={`${
          adminUI ? "badge-secondary" : ""
        }  badge mr-4 flex cursor-pointer items-center text-xs font-bold`}
        onClick={toogleAdmin}
      >
        <ShieldCheckIcon className="mr-1 h-4 w-4" /> Admin
      </div>
    )}

    <div className="mr-2 flex items-center justify-end gap-2 rounded-md border border-primary bg-base-100 pt-1 pr-4">
      {currentUser && (
        <div className="flex">
          {wallet.publicKey ? (
            <div className="mr-4 flex">
              <Wallet />
            </div>
          ) : (
            <Wallet />
          )}

          <div className="dropdown-end dropdown flex items-center">
            <div className="">
              {currentUser.avatar_url ? (
                <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                  <div className="bg-base-800">
                    <div className="w-10 rounded-full">
                      <Image
                        src={`${
                          currentUser.avatar_url.startsWith("https://")
                            ? currentUser.avatar_url
                            : (process.env.NEXT_PUBLIC_SUPABASE_URL as string) +
                              "/storage/v1/object/public/avatars/" +
                              currentUser.avatar_url
                        }`}
                        className="rounded-full"
                        width={42}
                        height={42}
                        alt={currentUser.full_name}
                      />
                    </div>
                  </div>
                </label>
              ) : (
                <div className="placeholder avatar">
                  <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                    <span>MX</span>
                  </div>
                </div>
              )}
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link href={"/profile"} className="justify-between">
                    Profile
                    <span className="badge-secondary badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      supabase.auth
                        .signOut()
                        .catch((error) => console.log(error));
                      setCurrentUser(null);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Navbar;
