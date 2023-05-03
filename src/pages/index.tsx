import { useContext } from "react";
import Head from "next/head";

import Layout from "@/layout";
import { ProjectsContext } from "@/contexts/projects.context";
import Spinner from "@/components/spinner/spinner.component";
import { ReviewerView } from "@/views/home/reviewer";

import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  const { projects, setProjects } = useContext(ProjectsContext);

  return (
    <>
      <Head>
        <title>Dean&apos;s List | Home</title>
        <meta property="og:title" content="Dean's List | Home" />
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
        {/* {currentUser?.account_enum == 0 && (
          <CostumerView deliverables={deliverables} team={team} />
        )} */}
        {/* {currentUser?.account_enum == 1 && (
          <ReviewerView projects={projects!} />
        )} */}
        {!projects || !setProjects ? (
          <Spinner />
        ) : (
          <ReviewerView projects={projects} setProjects={setProjects} />
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
