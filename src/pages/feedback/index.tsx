import Layout from "@/layout";
import { ReviewerFeedback } from "@/views/feedback/reviewer";
import type { Projects } from "@/types";
import type { NextPage, NextPageContext } from "next";
import { getSingleProject } from "@/tools/supabase";

interface Props {
  data: Projects | null;
}

const FeedbackPage: NextPage<Props> = ({ data }) => (
  <Layout>
    <ReviewerFeedback currentProject={data} />
  </Layout>
);

FeedbackPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { id } = ctx.query;
  console.log("welcome on the page for feedback ", id);
  const { data } = await getSingleProject(id as string);
  console.log(data);
  return { data };
};

export default FeedbackPage;
