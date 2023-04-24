import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { UserContext } from "@/contexts/user.context";
import { ProjectsContext } from "@/contexts/projects.context";
import { EditorContext } from "@/contexts/editor.context";
import LinkItem from "@/components/link-item/link-item.component";
import { Badge } from "@/components/badge/badge.component";
import { CategoryEnum } from "@/constants";
import { addFeedback, getProjectLinks } from "@/tools/supabase";
import { numericalToString } from "@/tools/core/month";
import { ChevronLeftIcon, DocumentIcon } from "@heroicons/react/24/solid";
import type { Documents, Links, Projects } from "@/types";
import type { OutputData } from "@editorjs/editorjs";
import type { FC } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const EditorBlock = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  currentProject: Projects | null;
}

export const ReviewerFeedback: FC<Props> = ({ currentProject }) => {
  const [data, setData] = useState<OutputData>();
  const { currentUser } = useContext(UserContext);
  const { editorData, setEditorData } = useContext(EditorContext);
  const { projects, documents } = useContext(ProjectsContext);
  const [userAgent, setUserAgent] = useState<string>();
  const [project, setProject] = useState<Projects | null>(currentProject);
  const [category, setCategory] = useState<CategoryEnum>();
  const [links, setLinks] = useState<Links[] | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   if (projects && projectName) {
  //     console.log("projects :", projects);
  //     const project = nameToProject(projects, projectName);
  //     if (project) {
  //       setTargetProject(project);
  //     }
  //   }
  // }, [projects, projectName]);

  useEffect(() => {
    const fetchLinks = async (project: Projects) => {
      return await getProjectLinks(project);
    };
    if (project) {
      // setLoading(true);
      fetchLinks(project)
        .then(({ data }) => {
          if (data) {
            setLinks(data);
            console.log("links : ", data);
          }
        })
        .finally(() => {
          // setTimeout(() => setLoading(false), 1000);
        });
    }
  }, [project]);

  useEffect(() => {
    if (window.navigator.userAgent) {
      console.log(window.navigator.userAgent);
      setUserAgent(window.navigator.userAgent);
    }
  }, [projects]);

  useEffect(() => {
    if (window.localStorage.getItem("editorData"))
      setData(
        JSON.parse(window.localStorage.getItem("editorData")!) as OutputData
      );
  }, []);

  const nameToProject = (projects: Projects[], str: string) => {
    if (projects && projects.length > 0) {
      const [project] = projects?.filter((project) => project.name == str);
      return project;
    } else {
      throw new Error("project not found !");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!project || !category) {
      switch (!project || !category || !editorData) {
        case !editorData:
          toast.error("Feedback is empty !");
          break;
        case !currentUser:
          toast.error("No project selected !");
          break;
        case !category:
          toast.error("No category selected !");
          break;
      }
    } else {
      toast
        .promise(
          addFeedback({
            id: null,
            title: "Undefined",
            user_id: currentUser!.id,
            project: project.id,
            content: JSON.stringify(editorData),
            category: category,
            published: true,
            user_agent: userAgent!,
            avatar_url: currentUser!.avatar_url,
            created_at: null,
          }),
          {
            loading: "Posting feedback..",
            success: () => {
              setEditorData(null);
              return <b>Feedback posted !</b>;
            },
            error: <b>Error posting feedback !</b>,
          }
        )
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
                defaultValue={currentProject?.name || "Target Project"}
                onChange={(e) => {
                  if (e.target.value && projects)
                    setProject(nameToProject(projects, e.target.value)!);
                }}
                required
              >
                <option disabled>Target Project</option>
                {projects?.map((project) => {
                  return (
                    <option
                      key={project.id}
                      selected={currentProject ? true : false}
                    >
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </li>
          {project && (
            <>
              <li className="mt-8 flex w-96 items-center px-1">
                <span className="text-sm">Project Focus :</span>

                <span className="ml-4 w-[50%]">
                  <Badge category={project.focus} />
                </span>
              </li>
              <li className="mt-8 flex w-96 flex-col px-1">
                <span className="text-sm">Submission ends :</span>
                {project && (
                  <span className="flex w-[100%] text-sm font-bold">
                    {`${numericalToString(
                      project.ends_at
                    )!} ${project.ends_at.split(
                      "-"
                    )[2]!} ${project.ends_at.split("-")[0]!}`}
                  </span>
                )}
              </li>
            </>
          )}
          <li className="mt-8 flex flex-col">
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">Feedback Category :</span>
              </label>
              <select
                className="select-bordered select"
                defaultValue={currentProject?.focus || "Target Project"}
                onChange={(e) => {
                  switch (e.target.value) {
                    case "UX/UI":
                      setCategory(CategoryEnum.UXUI);
                      break;
                    case "Documentation":
                      setCategory(CategoryEnum.Docs);
                      break;
                    case "Business/Strategy":
                      setCategory(CategoryEnum.Strategy);
                      break;
                    case "Community":
                      setCategory(CategoryEnum.Community);
                      break;
                  }
                }}
              >
                <option disabled>Choose</option>
                <option>UX/UI</option>
                <option>Documentation</option>
                <option>Business/Strategy</option>
                <option>Community</option>
              </select>
            </div>
          </li>
          {project && (
            <>
              <ul className="mt-8">
                <span className="text-xs">Links :</span>
                {links ? (
                  links.map((link) => (
                    <li key={link.id}>
                      <LinkItem
                        link={link}
                        links={links}
                        project={project}
                        setLinks={setLinks}
                      />
                      {/* <Link href={link.link}>
                <span className="text-sm font-bold text-secondary-dark">
                  {link.text}
                </span>
              </Link> */}
                    </li>
                  ))
                ) : (
                  <div className="mt-2 text-xs">
                    this project has no links yet.
                  </div>
                )}
              </ul>
              <ul className="mt-8">
                <span className="text-xs">Documents :</span>
                {documents ? (
                  documents.map((document) => (
                    <li key={document.id}>
                      <DocumentIcon className="h-6 w-6" />
                      <Link href={document.name}>
                        <span className="font-bold text-info">
                          {document.name}
                        </span>
                      </Link>
                      <span>{document.created_at}</span>
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
      <div className="flex h-[calc(100vh-67.5px)] w-[75vw] flex-col items-center justify-center border-t border-primary bg-[#fff]">
        <div className="flex h-[64px] w-full items-center justify-end bg-primary-dark py-2 pl-8 text-xl font-bold">
          <button
            className="btn-secondary btn-sm btn mr-4 capitalize"
            type="submit"
          >
            Add Feedback
          </button>
        </div>
        <div className="h-full w-full">
          <EditorBlock
            data={data}
            onChange={setData}
            holder="editorjs-container"
          />
        </div>
      </div>
    </form>
  );
};
