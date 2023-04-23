import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Blocks from "editorjs-blocks-react-renderer";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ProjectsContext } from "@/contexts/projects.context";
import Review from "@/components/review/review.component";
import { WIP } from "@/components/wip";
import { getSingleFeedback } from "@/tools/supabase";
import Layout from "@/layout";
import { CategoryEnum } from "@/constants";
import type { NextPage, NextPageContext } from "next";
import type { Feedbacks, Projects } from "@/types";
import { Badge } from "@/components/badge/badge.component";
import FeedbackTitle from "@/components/feedback-title/feedback-title.component";
import { UserContext } from "@/contexts/user.context";
interface Props {
  data: Feedbacks | null;
}

const FeedbackPage: NextPage<Props> = ({ data }) => {
  const { currentUser } = useContext(UserContext);
  const { projects } = useContext(ProjectsContext);
  const [project, setProject] = useState<Projects | null>(null);
  const [title, setTitle] = useState<string>(data!.title);
  const [isOwner, setIsOwner] = useState<boolean>(false);

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
              <h1 className="ml-8 p-8 text-3xl font-bold">
                <FeedbackTitle
                  feedback={data}
                  project={project}
                  setTitle={setTitle}
                  isOwner={isOwner}
                />
              </h1>
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
          <Review feedback={data} />
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
