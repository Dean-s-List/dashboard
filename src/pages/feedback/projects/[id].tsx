import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import Blocks from "editorjs-blocks-react-renderer";
import { UserContext } from "@/contexts/user.context";
import { ProjectsContext } from "@/contexts/projects.context";
import PlateEditor from "@/components/editor/plate.component";

import FeedbackTitle from "@/components/feedback/feedback.title";
// import FeedbackView from "@/components/feedback-view/feedback-view.component";
import ReviewComment from "@/components/review-comment/review-comment.component";
import { Badge } from "@/components/badge/badge.component";
import { WIP } from "@/components/wip";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import { CategoryEnum } from "@/constants";
import {
  deleteFeedback,
  getSingleFeedback,
  updateRecord,
} from "@/tools/supabase";

import Layout from "@/layout";

import type { Feedbacks, Projects } from "@/types";
import type { NextPage, NextPageContext } from "next";
import type { MyValue } from "@/components/editor/typescript/plateTypes";
import type { Json } from "@/types/supabase";

interface Props {
  data: Feedbacks | null;
}

const FeedbackPage: NextPage<Props> = ({ data }) => {
  const { currentUser, adminUI } = useContext(UserContext);
  const { projects } = useContext(ProjectsContext);
  const [project, setProject] = useState<Projects | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [value, setValue] = useState<
    MyValue | Json | string | null | undefined
  >();
  const [feedback, setFeedback] = useState<Feedbacks | null>(
    data ? data : null
  );

  const router = useRouter();

  useEffect(() => {
    if (!data) {
      const pid = router.asPath.split("/")[2];
      console.log("pid : ", pid);
      if (pid) {
        getSingleFeedback(pid)
          .then((res) => {
            console.log(res);
            if (res) {
              setFeedback(res);
              setValue(JSON.parse(res.content as string) as MyValue);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [data, router.asPath]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.id === feedback?.user_id) {
        setIsOwner(true);
      }
    }
  }, [currentUser, feedback]);

  useEffect(() => {
    if (projects) {
      const [currentProject] = projects.filter(
        (project) => project.id == feedback?.project
      );
      if (currentProject) setProject(currentProject);
    }
  }, [projects, feedback?.project]);

  const clickDelete = () => {
    // if (e) e.preventDefault();
    if (!isOwner || !currentUser || !feedback || !project) {
      toast.error("You're not allowed to do this !");
    } else {
      toast
        .promise(deleteFeedback(feedback), {
          loading: "Deleting feedback..",
          success: () => {
            return <b>Feedback deleted !</b>;
          },
          error: <b>Error deleting feedback !</b>,
        })
        .then(() => {
          router
            .push(
              {
                pathname: "/my-feedbacks",
              },
              "/feedback"
            )
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  const clickUpdate = () => {
    // if (e) e.preventDefault();
    if (!isOwner || !currentUser || !feedback || !project) {
      toast.error("You're not allowed to do this !");
    } else {
      const db = "feedbacks";
      toast
        .promise(
          updateRecord(
            {
              id: feedback.id,
              title: feedback.title,
              user_id: feedback.user_id,
              project: feedback.project,
              content: JSON.stringify(value),
              category: feedback.category,
              published: feedback.published,
              user_agent: feedback.user_agent,
              avatar_url: feedback.avatar_url,
              created_at: feedback.created_at,
              owner: feedback.owner,
              avg_stars: feedback.avg_stars,
              stars_count: feedback.stars_count,
              action_taken: feedback.action_taken
            },
            db
          ),
          {
            loading: "Updating feedback..",
            success: () => {
              return <b>Feedback updated !</b>;
            },
            error: <b>Error updating feedback !</b>,
          }
        )
        .then(() => {
          router
            .push(
              {
                pathname: "/my-feedbacks",
              },
              "/feedback"
            )
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (feedback?.content) {
      console.log(feedback.content);
      setValue(feedback.content);
    }
  }, [feedback]);

  return (
    <Layout>
      {data || feedback?.content ? (
        <>
          <div className="flex h-[calc(100vh-67.5px)] w-[75vw] flex-col border-r border-t border-l border-primary">
            <div className="flex w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
              <span className="btn-ghost btn items-center justify-start">
                <Link href="/" className="flex items-center pr-4">
                  <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
                </Link>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <h1 className="ml-8 p-8 text-3xl font-bold">
                  <FeedbackTitle
                    feedback={data ? data : feedback!}
                    project={project}
                    currentUser={currentUser!}
                    isOwner={isOwner}
                    adminUI={adminUI}
                  />
                </h1>

                {(currentUser && currentUser.id == data?.user_id) ||
                  (currentUser && currentUser.id == feedback?.user_id && (
                    <div className="mr-8 w-[50%] flex-1">
                      <div className="flex w-full justify-end">
                        <button
                          className="btn-secondary btn mr-4 capitalize"
                          onClick={clickUpdate}
                        >
                          Update
                        </button>
                        <button
                          className="btn-error btn capitalize"
                          onClick={clickDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mx-auto mb-2 flex w-[95%]">
                <span className="mx-auto flex w-[40%] items-center justify-start">
                  <span>
                    Project :
                    <span className="ml-1 font-bold">{project?.name}</span>{" "}
                  </span>
                </span>
                <span className="mx-auto flex w-[40%] flex-row items-center justify-end">
                  <span className="">Category : </span>

                  <span className="ml-1 w-[33%]">
                    <Badge category={feedback!.category!} />
                  </span>
                </span>
              </div>
            </div>
            <hr className="mx-auto w-[88%] text-primary" />
            <article className="text-white mx-auto mt-8 flex h-full w-full flex-col items-center justify-center overflow-y-scroll bg-[#fff]">
              <PlateEditor
                value={value}
                setValue={setValue}
                feedback={feedback}
                currentUser={currentUser}
                isOwner={true}
                adminUI={adminUI}
              />
            </article>
          </div>
          <ReviewComment feedback={feedback!} />
        </>
      ) : (
        <WIP />
      )}
    </Layout>
  );
};

export default FeedbackPage;
