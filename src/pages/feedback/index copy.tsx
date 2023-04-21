import Link from "next/link";
import { getSingleProject } from "@/tools/supabase";
import Layout from "@/layout";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import type { NextPage, NextPageContext } from "next";
import type { Profiles, Projects } from "@/types";
import { CategoryEnum } from "@/constants";

interface Props {
  data: Projects | null;
  currentUser: Profiles | null;
}

const FeedbackPage: NextPage<Props> = ({ data, currentUser }) => (
  <Layout>
    <div className="flex h-[calc(100vh-67.5px)] w-[75vw] flex-col border-r border-t border-l border-primary">
      <div className="flex w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
        <span className="btn-ghost btn items-center justify-start">
          <Link href="/" className="flex items-center pr-4">
            <ChevronLeftIcon className="mr-2 h-4 w-4" /> Backaaa
          </Link>
        </span>
      </div>
      <div className="flex flex-col">
        <h1 className="ml-8 p-8 text-3xl font-bold">
          {(data && data.name) || "Untitled"}
        </h1>
        <div className="mx-auto mb-2 flex w-[95%]">
          <span className="flex w-[50%] items-center justify-center">
            <span>Project : {data && data.name}</span>
          </span>
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
      <p className="text-white mx-auto mt-8 flex w-[88%] items-center justify-center">
        {data && data && (
          <div
            className="text-md mb-1 w-[100%]"
            // dangerouslySetInnerHTML={{ __html: data[0].content }}
          />
        )}
      </p>
    </div>
    <div className="flex h-[calc(100vh-67.5px)] w-[25vw] flex-col border-r border-t border-l border-primary"></div>
  </Layout>
);

FeedbackPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { id } = ctx.query;
  console.log("welcome on the page for feedback ", id);
  const { data } = await getSingleProject(id as string);
  console.log(data);
  return { data, currentUser: null };
};

export default FeedbackPage;
