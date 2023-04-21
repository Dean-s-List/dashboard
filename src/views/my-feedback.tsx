import FeedbackPreview from "@/components/feedback-preview/feedback-preview.component";

import type { Projects, Profiles, Feedbacks } from "@/types";
import type { FC } from "react";

type Props = {
  currentUser: Profiles;
  projects: Projects[];
  userFeedbacks: Feedbacks[];
};

const MyFeedback: FC<Props> = ({ currentUser, projects, userFeedbacks }) => (
  <div className="flex min-h-[calc(100vh-67.5px)] w-[100vw] flex-col border-t border-l border-primary p-8 md:h-[calc(100vh-67.5px)]">
    <h1>My Feedback</h1>
    <div className="mx-auto mt-8 grid w-[88%] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {userFeedbacks.map((feedback) => (
        <FeedbackPreview
          feedback={feedback}
          project={
            projects.filter(
              (project: Projects) => project.id == feedback.project
            )[0]!
          }
          key={feedback.id}
        />
      ))}
    </div>
  </div>
);

export default MyFeedback;
