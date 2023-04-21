import Link from "next/link";
import Blocks from "editorjs-blocks-react-renderer";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { CategoryEnum } from "@/constants";
import type { Feedbacks, Projects, Profiles } from "@/types";
import type { FC } from "react";

interface Props {
  project: Projects;
  feedback: Feedbacks;
  currentUser: Profiles;
}

const FeedbackPreview: FC<Props> = ({ project, feedback, currentUser }) => (
  <div className="h-[227px] max-w-[379px] rounded-md border-primary bg-primary-dark p-4 shadow-xl">
    <Link href={`/feedback/${feedback.id}`} className="h-[50%] max-h-[50%]">
      {feedback.content && (
        <div className="h-[50%] max-h-[50%] overflow-y-hidden">
          <Blocks
            data={JSON.parse(feedback.content as string)}
            config={{
              paragraph: {
                className: "text-base text-opacity-75",
                actionsClassNames: {
                  alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                },
              },
            }}
          />
        </div>
      )}
      {!feedback.content && <div className="h-[50%] max-h-[50%]" />}
    </Link>

    <hr />
    <div className="mt-1 flex h-[50%] w-[100%] items-end">
      <div className="flex w-[50%] flex-col">
        <span className="text-sm">Project : {project.name}</span>
        <div
          className={`badge badge-md mt-2 w-[100%] text-xs ${
            feedback.category == CategoryEnum.UXUI
              ? `uxui`
              : feedback.category == CategoryEnum.Docs
              ? `docs`
              : feedback.category == CategoryEnum.Strategy
              ? `strategy`
              : feedback.category == CategoryEnum.Community
              ? `community`
              : `error`
          }`}
        >
          {feedback.category === CategoryEnum.UXUI
            ? "UX/UI"
            : feedback.category === CategoryEnum.Docs
            ? "Documentation"
            : feedback.category === CategoryEnum.Strategy
            ? "Business/Strategy"
            : feedback.category === CategoryEnum.Community
            ? "Community"
            : "Error"}
        </div>
        <div className="mt-2 flex ">
          <span className="ml-4 flex items-center">
            <HandThumbUpIcon className="mr-2 h-4 w-4 text-[#ff0000] hover:text-[#ff000088]" />{" "}
            {feedback.upvotes}
          </span>
          <span className="ml-4 flex items-center">
            <HandThumbDownIcon className="mr-2 h-4 w-4 text-[#00ff00] hover:text-[#00ff0088]" />{" "}
            {feedback.downvotes}
          </span>
        </div>
      </div>
      <div className="mt-1 mr-0 flex h-[50%] w-[50%] items-center justify-end self-end">
        <span className="text-xs">{feedback.created_at.split("T")[0]}</span>
        <div className="btn-ghost btn-circle avatar btn">
          <div className="bg-base-800">
            <div className="w-8 rounded-full">
              <img src={currentUser.avatar_url} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeedbackPreview;
