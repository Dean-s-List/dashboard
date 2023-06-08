import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { getAllProjects, getCurrentUserFeedbacks } from "@/tools/supabase";
import { UserContext } from "@/contexts/user.context";
import MyFeedback from "@/views/my-feedback";
import Spinner from "@/components/spinner/spinner.component";
import type { Projects, Feedbacks } from "@/types";
import type { NextPage } from "next";
import Gated from "@/components/gated/gated.component";

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
    <>
      <Head>
        <title>Dean&apos;s List | My Feedbacks</title>
        <meta property="og:title" content="Dean's List | My Feedbacks" />
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
      <Gated>
        {currentUser && projects && userFeedbacks ? (
          <MyFeedback
            currentUser={currentUser}
            projects={projects}
            userFeedbacks={userFeedbacks}
          />
        ) : (
          <Spinner />
        )}
      </Gated>
    </>
  );
};

export default MyFeedbackPage;
