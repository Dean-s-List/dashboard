import { useState } from "react";
import { drawSVGInfo, drawSVGTalk } from "@/tools/svg";
import type { FC } from "react";

type TeamMember = {
  id: number;
  avatar: string;
  name: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 0,
    avatar:
      "https://cdn.discordapp.com/guilds/953959331353751632/users/895473162744135721/avatars/cf018d51ae0854de328903262642713d.webp?size=80",
    name: "Pavelsan",
  },
  {
    id: 1,
    avatar:
      "https://cdn.discordapp.com/avatars/454357166485143554/f10a2b5c96a614d2e512ec3affe351c4.webp?size=80",
    name: "DeanMachine",
  },
  {
    id: 2,
    avatar:
      "https://cdn.discordapp.com/avatars/836040289008877578/92b7e6b5c101b3b4949376a288acab76.webp?size=80",
    name: "Nanko.Sol",
  },
  {
    id: 3,
    avatar: "https://cdn.discordapp.com/avatars/845942875678310411/2f2223dccdc6389fb16f677dc2a92740.webp?size=80",
    name: "Readollar",
  }
];

const TeamMembers: FC = () => {
  const [team, setTeam] = useState(teamMembers);

  return (
    // <div className="mx-auto mt-4  shadow-xl md:mr-4"></div>
    <div className="mt-4 w-screen rounded-xl bg-primary-dark p-4 shadow-xl md:mr-8 md:w-auto">
      <div className="flex font-bold">
        Team Members <span className="pl-3">{drawSVGInfo(6)}</span>
      </div>
      <ul className="w-full">
        {team.map(({ id, avatar, name }) => (
          <li className="ml-0 list-none" key={id}>
            <div className="flex flex h-[65.7px] w-full items-center justify-center rounded-xl bg-primary-darker shadow-md">
              <div className="ml-[5%] flex w-[25%]">
                {/* AVATAR */}
                <div className=" avatar">
                  <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                    <img src={`${avatar}`} alt={`${name}`} />
                  </div>
                </div>
              </div>
              <div className="flex w-[50%] gap-4 text-center">
                <div className="w-full text-sm">{`${name}`}</div>
              </div>
              <div className="flex w-[25%] gap-4 text-center">
                <div className="flex w-full items-center justify-center">
                  {drawSVGTalk(6)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
