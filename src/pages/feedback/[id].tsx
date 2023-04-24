import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Blocks from "editorjs-blocks-react-renderer";
import { UserContext } from "@/contexts/user.context";
import { EditorContext } from "@/contexts/editor.context";
import { ProjectsContext } from "@/contexts/projects.context";
import FeedbackTitle from "@/components/feedback-title/feedback-title.component";
// import FeedbackView from "@/components/feedback-view/feedback-view.component";
import ReviewComment from "@/components/review-comment/review-comment.component";
import { Badge } from "@/components/badge/badge.component";
import { WIP } from "@/components/wip";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import { CategoryEnum } from "@/constants";
import {
  deleteFeedback,
  getSingleFeedback,
  updateFeedback,
} from "@/tools/supabase";

import Layout from "@/layout";

import type { OutputData } from "@editorjs/editorjs";
import type { Feedbacks, Projects } from "@/types";
import type { NextPage, NextPageContext } from "next";

interface Props {
  data: Feedbacks | null;
}

const FeedbackPage: NextPage<Props> = ({ data }) => {
  const { currentUser, isAdmin } = useContext(UserContext);
  const { editorData, setEditorData } = useContext(EditorContext);
  const { projects } = useContext(ProjectsContext);
  const [project, setProject] = useState<Projects | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.id === data!.user_id) {
        setIsOwner(true);
      }
    }
  }, [currentUser, data]);

  useEffect(() => {
    if (projects) {
      const [currentProject] = projects.filter(
        (project) => project.id == data?.project
      );
      if (currentProject) setProject(currentProject);
    }
  }, [projects, data?.project]);

  useEffect(() => {
    if (data) setEditorData(data.content as OutputData);
  });

  const onClick = () => {
    // if (e) e.preventDefault();
    if (!isOwner || !currentUser || !data || !project) {
      toast.error("You're not allowed to do this !");
    } else {
      toast
        .promise(deleteFeedback(data), {
          loading: "Deleting feedback..",
          success: () => {
            setEditorData(null);
            return <b>Feedback deleted !</b>;
          },
          error: <b>Error deleting feedback !</b>,
        })
        .then(() => {
          // if (feedback) {
          router
            .push(
              {
                pathname: "/my-feedbacks",
                // query: { id: feedback.id },
              },
              "/feedback"
            )
            .catch((error) => console.log(error));
          // }
        })
        .catch((error) => console.log(error));
    }
  };

  // const onClick = async () => {
  //   // e.preventDefault();
  //   if (data)
  //     await deleteFeedback(data)
  //       .then(() => {
  //         router
  //           .push(
  //             {
  //               pathname: "/my-feedbacks",
  //             },
  //             "/feedback"
  //           )
  //           .catch((error) => console.log(error));
  //       })
  //       .catch((error) => console.log(error));
  // };

  return (
    <Layout>
      {data ? (
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
                    feedback={data}
                    project={project}
                    currentUser={currentUser!}
                    isOwner={isOwner}
                    isAdmin={isAdmin}
                  />
                </h1>
                {currentUser!.id == data.user_id && (
                  <div className="mr-8 flex w-full justify-end">
                    <button
                      className="btn-error btn capitalize"
                      onClick={onClick}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="mx-auto mb-2 flex w-[95%]">
                <span className="mx-auto flex w-[40%] items-center justify-start">
                  <span>
                    Project :<span className="font-bold">{project?.name}</span>{" "}
                  </span>
                </span>
                <span className="mx-auto flex w-[40%] flex-row items-center justify-end">
                  <span className="">Category : </span>

                  <span className="ml-1 w-[33%]">
                    <Badge category={data.category} />
                  </span>
                </span>
              </div>
            </div>
            <hr className="mx-auto w-[88%] text-primary" />
            {/* <FeedbackView
              feedback={data}
              data={editorData}
              // setData={setEditorData}
              isOwner={isOwner}
            /> */}
            <article className="text-white mx-auto mt-8 flex w-[88%] flex-col items-center justify-center">
              <Blocks
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data={JSON.parse(data.content as string)}
                config={{
                  paragraph: {
                    className:
                      "text-base text-opacity-75 h-[50%] max-h-[50%] mb-4",
                    actionsClassNames: {
                      alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                    },
                  },
                }}
              />
            </article>
          </div>
          <ReviewComment feedback={data} />
        </>
      ) : (
        <WIP />
      )}
    </Layout>
  );
};

FeedbackPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { id } = ctx.query;
  console.log("welcome on the page for feedback ", id);
  const { data } = await getSingleFeedback(id as string);
  console.log(data);
  return { data };
};

export default FeedbackPage;
