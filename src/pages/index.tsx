import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/contexts/user.context";
import Layout from "@/layout";
import CostumerView from "@/views/home/costumer";
import { ReviewerView } from "@/views/home/reviewer";
import type { NextPage } from "next";
import { ProjectsContext } from "@/contexts/projects.context";
import Spinner from "@/components/spinner/Spinner";

const Dashboard: NextPage = () => {
  const { projects } = useContext(ProjectsContext);

  return (
    <>
      <Head>
        <title>Dean&apos;s List | Home</title>
        <meta property="og:title" content="Dean's List | Dashboard" />
        <meta property="og:site_name" content="Dean's List" />
        <meta property="og:url" content="https://app.deanslist.services/" />
        <meta property="og:description" content="We learn & buidl stuff." />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Deans-List/dashboard/main/public/images/embed.png"
        />
      </Head>
      <Layout>
        {/* {currentUser?.account_enum == 0 && (
          <CostumerView deliverables={deliverables} team={team} />
        )} */}
        {/* {currentUser?.account_enum == 1 && (
          <ReviewerView projects={projects!} />
        )} */}
        {!projects ? <Spinner /> : <ReviewerView projects={projects} />}
      </Layout>
    </>
  );
};

export default Dashboard;
