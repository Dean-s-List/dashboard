import { useState } from "react";
import { UserIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

import { CategoryEnum } from "@/constants";

import type { Feedbacks } from "@/types";
import type { FC } from "react";

import { _FEEDBACK_ } from "@/mock/feedback";
import { TicketIcon } from "@heroicons/react/24/outline";

const FeedbackTable: FC = () => {
  const [feedback, setFeedback] = useState<Feedbacks[] | null>(_FEEDBACK_);
  return (
    <table className="w-[100%] rounded-lg">
      <thead className="flex w-[100%] text-center">
        <tr className="flex w-[100%] items-center justify-center py-1">
          <th className="flex w-[100%] items-center justify-center py-1">
            <span className="mr-2">
              <UserIcon className="h-6 w-6" />
            </span>
            Team Member
          </th>
          <th className="flex w-[100%] items-center justify-center py-1">
            <span className="mr-2">
              <TicketIcon className="h-6 w-6" />
            </span>
            Category
          </th>
        </tr>
      </thead>
      <tbody>
        {feedback?.map(({ id, category }: Feedbacks) => (
          <tr className="flex w-[100%]" key={id}>
            <td className="flex w-[90%] items-center justify-center py-1">
              <div className="placeholder avatar">
                <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                  <span>AF</span>
                </div>
              </div>
              <div className="pl-2 text-xs md:text-sm">{`${id}`}</div>
            </td>
            <td className="static flex w-[90%] items-center justify-center py-1">
              <div className="flex w-[90%] items-center justify-center">
                <div
                  className={`badge badge-md ${
                    category == CategoryEnum.UXUI
                      ? `uxui`
                      : category == CategoryEnum.Docs
                      ? `docs`
                      : category == CategoryEnum.Strategy
                      ? `strategy`
                      : category == CategoryEnum.Community
                      ? `community`
                      : `error`
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
              <div className="">
                <EllipsisHorizontalIcon className="h-6 w-6" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;
