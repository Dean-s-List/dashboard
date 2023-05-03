import Layout from "@/layout";
import { ReviewerFeedback } from "@/views/feedback/reviewer";
import { getSingleFeedback, loadSingleProject } from "@/tools/supabase";

import type { Feedbacks, Projects } from "@/types";
import type { NextPage, NextPageContext } from "next";

interface Props {
  project: Projects | null | undefined;
  data: Feedbacks | null | undefined;
}

const FeedbackPage: NextPage<Props> = ({ project, data }) => (
  <Layout>
    <ReviewerFeedback currentProject={project!} draft={data!} />
  </Layout>
);

FeedbackPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { id, draft } = ctx.query;
  console.log("welcome on the page for feedback ", id);
  const project = await loadSingleProject(id as string);
  const data = await getSingleFeedback(draft as string);
  console.log(project);
  return { project, data };
};

export default FeedbackPage;
