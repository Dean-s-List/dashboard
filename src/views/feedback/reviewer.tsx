import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeftIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/contexts/user.context";
import { addFeedback, getProjectLinks } from "@/tools/supabase";
import { numericalToString } from "@/tools/core/month";
import { CategoryEnum } from "@/constants";
import type { OutputData } from "@editorjs/editorjs";
import type { Links, Projects } from "@/types";
import type { FC, FormEvent } from "react";

const EditorBlock = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  projects: Projects[] | null;
}

export const ReviewerFeedback: FC<Props> = ({ projects }) => {
  const [data, setData] = useState<OutputData>();
  const { currentUser } = useContext(UserContext);
  const [userAgent, setUserAgent] = useState<string>();
  const [targetProject, setTargetProject] = useState<Projects | null>(null);
  const [targetProjectName, setTargetProjectName] = useState<string | null>(
    null
  );
  const [feedbackCategory, setFeedbackCategory] = useState<CategoryEnum>();
  const [targetProjectLinks, setTargetProjectsLinks] = useState<Links[] | null>(
    null
  );

  useEffect(() => {
    if (targetProject) {
      const fetchProjectLinks = async () => {
        return await getProjectLinks(targetProject);
      };
      fetchProjectLinks()
        .then(({ data }) => {
          if (data) {
            setTargetProjectsLinks(data);
            console.log(data);
          }
        })
        .catch((error) => console.log(error));
      // .finally(() => setLoading(false));
    }
  }, [targetProject]);

  useEffect(() => {
    if (projects && targetProjectName) {
      console.log("projects :", projects);
      const project = nameToProject(projects, targetProjectName);
      if (project) {
        setTargetProject(project);
      }
    }
  }, [projects, targetProjectName]);

  useEffect(() => {
    if (window.navigator.userAgent) {
      console.log(window.navigator.userAgent);
      setUserAgent(window.navigator.userAgent);
    }
  }, [projects]);

  const nameToProject = (projects: Projects[], str: string) => {
    if (projects && projects.length > 0) {
      const [project] = projects?.filter((project) => project.name == str);
      return project;
    } else {
      throw new Error("project not found !");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentUser && targetProject && data && feedbackCategory && userAgent) {
      addFeedback({
        user_id: currentUser.id,
        title: "",
        project: targetProject.id,
        content: JSON.stringify(data),
        category: feedbackCategory,
        published: true,
        user_agent: userAgent,
      })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }
  };

  return (
    <form
      className="static flex max-w-[100%] overflow-x-hidden"
      onSubmit={onSubmit}
    >
      <div className="flex h-[calc(100vh-67.5px)] w-[25vw] flex-col border-r border-t border-l border-primary">
        <div className="flex w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
          <span className="btn-ghost btn items-center justify-start">
            <Link href="/" className="flex items-center pr-4">
              <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
            </Link>
          </span>
        </div>
        <ul className="mx-auto w-96 px-2 pt-8">
          <li className="flex flex-col">
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">Project Name :</span>
              </label>
              <select
                className="select-bordered select w-full"
                onChange={(e) => {
                  if (e.target.value && projects)
                    setTargetProject(nameToProject(projects, e.target.value)!);
                }}
                required
              >
                <option disabled selected>
                  Target Project
                </option>
                {projects?.map((project) => {
                  return <option key={project.id}>{project.name}</option>;
                })}
              </select>
            </div>
          </li>
          {targetProject && (
            <li className="mt-8 flex w-96 flex-col px-1">
              <span className="text-sm">
                Project Focus :{" "}
                <div
                  className={`badge badge-md mx-auto w-[50%] ${
                    targetProject.focus == CategoryEnum.UXUI
                      ? `uxui`
                      : targetProject.focus == CategoryEnum.Docs
                      ? `docs`
                      : targetProject.focus == CategoryEnum.Strategy
                      ? `strategy`
                      : targetProject.focus == CategoryEnum.Community
                      ? `community`
                      : `error`
                  }`}
                >
                  {targetProject.focus === CategoryEnum.UXUI
                    ? "UX/UI"
                    : targetProject.focus === CategoryEnum.Docs
                    ? "Documentation"
                    : targetProject.focus === CategoryEnum.Strategy
                    ? "Business/Strategy"
                    : targetProject.focus === CategoryEnum.Community
                    ? "Community"
                    : "Error"}
                </div>
              </span>
            </li>
          )}

          {targetProject?.ends_at && (
            <li className="mt-8 flex w-96 flex-col px-1">
              <span className="text-sm">Submission ends :</span>
              {targetProject && (
                <span className="flex w-[100%] text-sm font-bold">
                  {`${numericalToString(
                    targetProject.ends_at
                  )!} ${targetProject.ends_at.split(
                    "-"
                  )[2]!} ${targetProject.ends_at.split("-")[0]!}`}
                </span>
              )}
            </li>
          )}

          <li className="mt-8 flex flex-col">
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">Feedback Category :</span>
              </label>
              <select
                className="select-bordered select"
                onChange={(e) => {
                  switch (e.target.value) {
                    case "UX/UI":
                      setFeedbackCategory(CategoryEnum.UXUI);
                      break;
                    case "Documentation":
                      setFeedbackCategory(CategoryEnum.Docs);
                      break;
                    case "Business/Strategy":
                      setFeedbackCategory(CategoryEnum.Strategy);
                      break;
                    case "Community":
                      setFeedbackCategory(CategoryEnum.Community);
                      break;
                  }
                }}
              >
                <option disabled selected>
                  Choose
                </option>
                <option>UX/UI</option>
                <option>Documentation</option>
                <option>Business/Strategy</option>
                <option>Community</option>
              </select>
            </div>
          </li>
          {targetProject && (
            <>
              <ul className="mt-8">
                <span className="text-sm">Links :</span>
                {targetProjectLinks && targetProjectLinks.length > 0 ? (
                  targetProjectLinks.map((link) => (
                    <li key={link.id}>
                      <Link href={link.link} />
                    </li>
                  ))
                ) : (
                  <div className="mt-2 text-xs">
                    this project has no links yet.
                  </div>
                )}
              </ul>
              <ul className="mt-8">
                <span className="text-sm">Documents :</span>
                {targetProjectLinks && targetProjectLinks.length > 0 ? (
                  targetProjectLinks.map((link) => (
                    <li key={link.id}>
                      <DocumentIcon className="h-6 w-6" />
                      <Link href={link.link}>
                        <span className="font-bold text-info">{link.text}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <div className="mt-2 text-xs">
                    this project has no documets yet.
                  </div>
                )}
              </ul>
            </>
          )}
          {userAgent && (
            <div className="absolute bottom-8">
              <li className="mt-8 flex flex-col text-sm">
                <span className="text-xs">OS Version :</span>
                <span className="mt-1 font-bold">
                  {userAgent.split(" ")[2]}{" "}
                  {userAgent.split(" ")[3]?.replace(";", "")}
                </span>
              </li>
              <li className="mt-4 flex flex-col">
                <span className="text-xs">Browser Version :</span>
                <span className="mt-1 text-sm font-bold">
                  {userAgent.split(" ")[0]}{" "}
                  <span className="font-normal">— </span>
                  {userAgent.split(" ")[userAgent.split(" ").length - 1]}
                </span>
              </li>
            </div>
          )}
        </ul>
      </div>
      <div className="flex h-[calc(100vh-67.5px)] w-[75vw] flex-col border-t border-primary bg-[#000]">
        <div className="flex h-[64px] w-full items-center justify-end bg-primary-dark py-2 pl-8 text-xl font-bold">
          <button
            className="btn-secondary btn-sm btn mr-4 capitalize"
            type="submit"
          >
            Add Feedback
          </button>
        </div>
        <EditorBlock
          data={data}
          onChange={setData}
          holder="editorjs-container"
        />
      </div>
    </form>
  );
};
