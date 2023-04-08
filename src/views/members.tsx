import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { TeamMember } from "@/components/team-member/team-member.component";
import type { FC } from "react";
import type { TeamMemberItem } from "@/types";

import { _TEAM_MEMBERS_ } from "@/mock/team-members";

const Members: FC = () => {
  const [team, setTeam] = useState(_TEAM_MEMBERS_);

  return (
    <div className="mx-auto mx-[auto] mt-8 flex flex-col items-center justify-center rounded-xl bg-primary-dark p-4 shadow-xl md:mr-8 md:w-[379px]">
      <div className="flex font-bold">
        Team Members{" "}
        <span className="pl-3">
          <InformationCircleIcon className="h-6 w-6" />
        </span>
      </div>
      <ul className="w-full">
        {team.map((member: TeamMemberItem) => (
          <li className="ml-0 list-none" key={member.id}>
            <TeamMember member={member} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
