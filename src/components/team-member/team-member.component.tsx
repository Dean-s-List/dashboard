import Image from "next/image";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

interface Props {
  full_name: string;
  avatar_url: string | null;
}

const TeamMember: FC<Props> = ({ full_name, avatar_url }) => (
  <div className="flex flex h-[65.7px] w-[331px] max-w-[331px] items-center justify-center rounded-xl border border-primary bg-primary-darker shadow-xl">
    <div className="ml-[5%] flex w-[25%]">
      {/* AVATAR */}
      {avatar_url ? (
        <div className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            <Image
              src={`${
                avatar_url.startsWith("https://")
                  ? avatar_url
                  : (process.env.NEXT_PUBLIC_SUPABASE_URL as string) +
                    "/storage/v1/object/public/avatars/" +
                    avatar_url
              }`}
              className="border-border-primary rounded-full"
              width={42}
              height={42}
              alt={`${full_name}`}
            />
          </div>
        </div>
      ) : (
        <div className="placeholder avatar">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            <span>DL</span>
          </div>
        </div>
      )}
    </div>
    <div className="flex flex w-[100%] flex-col justify-center text-center">
      <div className="text-md w-full font-bold">{`${full_name}`}</div>
      {/* <div className="w-full text-xs">{`${roles}`}</div> */}
    </div>
    <div className="flex w-[25%] gap-4 text-center">
      <div className="mr-[10%] flex w-full items-center justify-center">
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

export default TeamMember;
