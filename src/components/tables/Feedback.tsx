import { useState } from "react";

import { drawSVGUser, drawSVGTicket, drawSVGDots } from "@/tools/svg";
import { UserIcon } from "@heroicons/react/24/solid";

import { CategoryEnum } from "@/constants";

import type { FeedbackItem } from "@/types";
import type { FC } from "react";

import { _FEEDBACK_ } from "@/mock/feedback";

const FeedbackTable: FC = () => {
  const [feedback, setFeedback] = useState(_FEEDBACK_);
  return (
    <table className="w-[100%] rounded-lg">
      <thead className="flex w-[100%] text-center">
        <tr className="flex w-[100%] items-center justify-center py-1">
          <th className="flex w-[100%] items-center justify-center py-1">
            <span className="mr-2">
              <UserIcon />
            </span>
            Team Member
          </th>
          <th className="flex w-[100%] items-center justify-center py-1">
            <span className="mr-2">{drawSVGTicket()}</span>Category
          </th>
        </tr>
      </thead>
      <tbody>
        {feedback &&
          feedback.map(({ id, teamMember, category }: FeedbackItem) => (
            <tr className="flex w-[100%]" key={id}>
              <td className="flex w-[90%] items-center justify-center py-1">
                <div className="placeholder avatar">
                  <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                    <span>AF</span>
                  </div>
                </div>
                <div className="pl-2 text-xs md:text-sm">{`${teamMember}`}</div>
              </td>
              <td className="static flex w-[90%] items-center justify-center py-1">
                <div className="flex w-[90%] items-center justify-center">
                  <div
                    className={`badge badge-sm badge-${
                      category === CategoryEnum.UXUI
                        ? "primary-dark"
                        : category === CategoryEnum.Docs
                        ? "primary-darker"
                        : category === CategoryEnum.Strategy
                        ? "info"
                        : category === CategoryEnum.Community
                        ? "warning"
                        : "error"
                    }`}
                  >
                    {category === CategoryEnum.UXUI
                      ? "UX/UI"
                      : category === CategoryEnum.Docs
                      ? "Documentation"
                      : category === CategoryEnum.Strategy
                      ? "Business/Strategy"
                      : category === CategoryEnum.Community
                      ? "Community"
                      : "Error"}
                  </div>
                </div>
                <div className="">{drawSVGDots()}</div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;
