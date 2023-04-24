import Link from "next/link";
import Blocks from "editorjs-blocks-react-renderer";
import { getSingleFeedback } from "@/tools/supabase";
import Layout from "@/layout";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { CategoryEnum } from "@/constants";
import type { NextPage, NextPageContext } from "next";
import type { Projects } from "@/types";
import { WIP } from "@/components/wip";

interface Props {
  data: Projects | null;
}

const FeedbackPage: NextPage<Props> = ({ data }) => (
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
              {data.name || "Untitled"}
            </h1>
            <div className="mx-auto mb-2 flex w-[95%]">
              {/* <span className="flex w-[50%] items-center justify-center">
                <span>Project : {data && data.project}</span>
              </span> */}
              <span className="flex w-[50%] items-center justify-center">
                <span className="w-[50%] items-center justify-center">
                  Category :{" "}
                  <div
                    className={`badge badge-md mx-auto ml-4 ${
                      data && data.focus == CategoryEnum.UXUI
                        ? `uxui`
                        : data && data.focus == CategoryEnum.Docs
                        ? `docs`
                        : data && data.focus == CategoryEnum.Strategy
                        ? `strategy`
                        : data && data.focus == CategoryEnum.Community
                        ? `community`
                        : `error`
                    }`}
                  >
                    {data && data.focus === CategoryEnum.UXUI
                      ? "UX/UI"
                      : data && data.focus === CategoryEnum.Docs
                      ? "Documentation"
                      : data && data.focus === CategoryEnum.Strategy
                      ? "Business/Strategy"
                      : data && data.focus === CategoryEnum.Community
                      ? "Community"
                      : "Error"}
                  </div>
                </span>
              </span>
            </div>
          </div>
          <hr />
          {/* <p className="text-white mx-auto mt-8 flex w-[88%] flex-col items-center justify-center">
            {data.content && (
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
            )}
          </p> */}
        </div>
        <div className="flex h-[calc(100vh-67.5px)] w-[25vw] flex-col border-r border-t border-l border-primary"></div>
      </>
    ) : (
      <WIP />
    )}
  </Layout>
);

// FeedbackPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
//   const { id } = ctx.query;
//   console.log("welcome on the page for feedback ", id);
//   const { data } = await getSingleProject(id as string);
//   console.log(data);
//   return { data };
// };

export default FeedbackPage;
