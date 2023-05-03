import { useContext, useEffect, useState } from "react";
import { getAllProjects, getCurrentUserFeedbacks } from "@/tools/supabase";
import { UserContext } from "@/contexts/user.context";
import Layout from "@/layout";
import MyFeedback from "@/views/my-feedback";
import Spinner from "@/components/spinner/spinner.component";
import type { Projects, Feedbacks } from "@/types";
import type { NextPage } from "next";

const MyFeedbackPage: NextPage = () => {
  const [projects, setProjects] = useState<Projects[]>();
  const { currentUser } = useContext(UserContext);
  const [userFeedbacks, setUserFeedbacks] = useState<Feedbacks[]>();

  useEffect(() => {
    const fetchProjects = async () => {
      return await getAllProjects();
    };
    fetchProjects()
      .then(({ data }) => {
        if (data) {
          // console.log(data);
          setProjects(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchUserFeedbacks = async () => {
        return await getCurrentUserFeedbacks(currentUser);
      };
      fetchUserFeedbacks()
        .then((data) => {
          if (data) {
            console.log(data);
            setUserFeedbacks(data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  return (
    <Layout>
      {currentUser && projects && userFeedbacks ? (
        <MyFeedback
          currentUser={currentUser}
          projects={projects}
          userFeedbacks={userFeedbacks}
        />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default MyFeedbackPage;
