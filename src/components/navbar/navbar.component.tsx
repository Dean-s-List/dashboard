import React, { FC, SetStateAction } from "react";
import Link from "next/link";

import Wallet from "../wallet";
import type { CurrentUser, Profiles } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { WalletContextState } from "@solana/wallet-adapter-react";

type Props = {
  currentUser: Profiles;
  setCurrentUser: React.Dispatch<SetStateAction<Profiles | null>>;
  wallet: WalletContextState;
  supabase: SupabaseClient;
};

const Navbar: FC<Props> = ({
  currentUser,
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
    <div className="mr-2 flex items-center justify-end gap-2 rounded-md border border-primary bg-base-100 py-1 pr-4">
      {currentUser && (
        <div className="flex">
          {wallet.publicKey ? (
            <div className="mr-4 flex">
              <Wallet />
              {/* <div className="flex flex-col">
                <span>0</span>
                <span>{ellipsis(wallet.publicKey.toString())}</span>
              </div> */}
            </div>
          ) : (
            <Wallet />
          )}

          <div className="dropdown-end dropdown">
            <div className="">
              {currentUser.avatar_url ? (
                <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                  <div className="bg-base-800">
                    <div className="w-10 rounded-full">
                      <img
                        src={currentUser.avatar_url}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </label>
              ) : (
                <div className="placeholder avatar">
                  <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
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
                      supabase.auth.signOut();
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
