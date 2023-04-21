import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/contexts/user.context";
import { getAllProjects } from "@/tools/supabase";
import Layout from "@/layout";
import CostumerView from "@/views/home/costumer";
import { ReviewerView } from "@/views/home/reviewer";
import type { NextPage } from "next";
import { Deliverables, Profiles, Projects } from "@/types";

const Dashboard: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [projects, setProjects] = useState<Projects[] | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverables[] | null>(null);
  const [team, setTeam] = useState<Profiles[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      return await getAllProjects();
    };
    fetchProjects()
      .then(({ data }) => {
        if (data) {
          setProjects(data as any);
          console.log(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Dean's List | Home</title>
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
        {currentUser?.account_enum == 0 && (
          <CostumerView deliverables={deliverables} team={team} />
        )}
        {currentUser?.account_enum == 1 && projects && (
          <ReviewerView projects={projects} />
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
