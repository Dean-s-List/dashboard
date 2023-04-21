import { useState, useEffect } from "react";
import Layout from "@/layout";
import { ReviewerFeedback } from "@/views/feedback/reviewer";
import { getAllProjects } from "@/tools/supabase";
import type { Deliverables, Profiles, Projects } from "@/types";
import type { NextPage } from "next";
import Spinner from "@/components/spinner/Spinner";

interface Props {
  projects: Projects[] | null;
  currentUser: Profiles | null;
  deliverables: Deliverables[] | null;
  team: [] | null;
}

const FeedbackPage: NextPage<Props> = ({ currentUser, deliverables, team }) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Projects[] | null>(null);
  useEffect(() => {
    async function loadAllProject() {
      const { data } = await getAllProjects();
      console.log(data);
      return data;
    }

    loadAllProject()
      .then((projects) => {
        console.log(projects);
        if (projects) {
          setProjects(projects);
        } else {
          setProjects(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Layout>
      {loading ? <Spinner /> : <ReviewerFeedback projects={projects} />}
    </Layout>
  );
};

export default FeedbackPage;
