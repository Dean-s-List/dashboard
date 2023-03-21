import { useState } from "react";
import { drawSVGUser, drawSVGTicket, drawSVGDots } from "@/tools/svg";
import { Category } from "@/types";
import type { Feedback } from "@/types";
import type { FC } from "react";

const feedbacks: Feedback[] = [
  {
    id: 0,
    teamMember: "Alfreds Futterkiste",
    category: Category.UxUi,
  },
  {
    id: 1,
    teamMember: "Alfreds Futterkiste",
    category: Category.Docs,
  },
  {
    id: 2,
    teamMember: "Alfreds Futterkiste",
    category: Category.BizStrat,
  },
  {
    id: 3,
    teamMember: "Alfreds Futterkiste",
    category: Category.Community,
  },
];

const FeedbackTable: FC = () => {
  const [feedback, setFeedback] = useState(feedbacks);
  return (
    <table className="w-[100%] rounded-lg">
      <tr className="flex w-[100%] text-center">
        <th className="flex w-[100%] items-center justify-center py-1">
          <span className="mr-2">{drawSVGUser()}</span>Team Member
        </th>
        <th className="flex w-[100%] items-center justify-center py-1">
          <span className="mr-2">{drawSVGTicket()}</span>Category
        </th>
      </tr>
      {feedback &&
        feedback.map(({ id, teamMember, category }) => (
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
                    category === Category.UxUi
                      ? "primary-dark"
                      : category === Category.Docs
                      ? "primary-darker"
                      : category === Category.BizStrat
                      ? "info"
                      : category === Category.Community
                      ? "warning"
                      : "error"
                  }`}
                >
                  {category === Category.UxUi
                    ? "UX/UI"
                    : category === Category.Docs
                    ? "Documentation"
                    : category === Category.BizStrat
                    ? "Business/Strategy"
                    : category === Category.Community
                    ? "Community"
                    : "Error"}
                </div>
              </div>
              <div className="">{drawSVGDots()}</div>
            </td>
          </tr>
        ))}
    </table>
  );
};

export default FeedbackTable;
