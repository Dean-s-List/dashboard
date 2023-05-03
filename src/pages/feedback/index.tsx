import Head from "next/head";
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
  <>
    <Head>
      <title>Dean&apos;s List | Feedback</title>
      <meta property="og:title" content="Dean's List | Feedback" />
      <meta property="og:site_name" content="Dean's List" />
      <meta property="og:url" content="https://app.deanslist.services/" />
      <meta
        property="og:description"
        content="Service DAO improving the Web3 ecosystem one feedback at the time."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/Deans-List/dashboard/main/public/images/dl_embed.png"
      />
    </Head>
    <Layout>
      <ReviewerFeedback currentProject={project!} draft={data!} />
    </Layout>
  </>
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
