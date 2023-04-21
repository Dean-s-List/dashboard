import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import type { FC, PropsWithChildren } from "react";
import type { Profiles } from "@/types";

interface TeamMemberProps {
  member: Profiles;
}

export const TeamMember: FC<PropsWithChildren<TeamMemberProps>> = ({
  children,
  member,
}) => {
  const { full_name, avatar_url } = member;
  return (
    <div className="flex flex h-[65.7px] w-full items-center justify-center rounded-xl bg-primary-darker shadow-md">
      <div className="ml-[5%] flex w-[25%]">
        {/* AVATAR */}
        {avatar_url ? (
          <div className=" avatar">
            <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
              <img src={`${avatar_url}`} alt={`${full_name}`} />
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
        <div className="flex w-full items-center justify-center">
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
        </div>
      </div>
      {children}
    </div>
  );
};
