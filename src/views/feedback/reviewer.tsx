import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeftIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/contexts/user.context";
import {
  addFeedback,
  getProjectDocuments,
  getProjectLinks,
} from "@/tools/supabase";
import { numericalToString } from "@/tools/core/month";
import { CategoryEnum } from "@/constants";
import type { OutputData } from "@editorjs/editorjs";
import type { Documents, Links, Projects } from "@/types";
import type { FC } from "react";
import { Badge } from "@/components/badge/badge.component";
import { cp } from "fs";
import { ProjectsContext } from "@/contexts/projects.context";

const EditorBlock = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  currentProject: Projects | null;
}

export const ReviewerFeedback: FC<Props> = ({ currentProject }) => {
  const [data, setData] = useState<OutputData>();
  const { currentUser } = useContext(UserContext);
  const { projects } = useContext(ProjectsContext);
  const [userAgent, setUserAgent] = useState<string>();
  const [targetProject, setTargetProject] = useState<Projects | null>(
    currentProject
  );
  const [targetProjectName, setTargetProjectName] = useState<string | null>(
    null
  );
  const [feedbackCategory, setFeedbackCategory] = useState<CategoryEnum>();
  const [targetProjectLinks, setTargetProjectsLinks] = useState<Links[] | null>(
    null
  );
  const [targetProjectDocuments, setTargetProjectDocuments] = useState<
    Documents[] | null
  >(null);

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
    if (targetProject) {
      const fetchProjectDocuments = async () => {
        return await getProjectDocuments(targetProject);
      };
      fetchProjectDocuments()
        .then(({ data }) => {
          if (data) {
            setTargetProjectDocuments(data);
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser && targetProject && data && feedbackCategory && userAgent) {
      addFeedback({
        id: null,
        title: null,
        user_id: currentUser.id,
        project: targetProject.id,
        content: JSON.stringify(data),
        category: feedbackCategory,
        published: true,
        user_agent: userAgent,
        avatar_url: currentUser.avatar_url,
        created_at: null,
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
                <option disabled>Target Project</option>
                {projects?.map((project) => {
                  return (
                    <option
                      key={project.id}
                      selected={
                        currentProject && project.id == currentProject.id
                          ? true
                          : false
                      }
                    >
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </li>
          {targetProject && (
            <li className="mt-8 flex w-96 items-center px-1">
              <span className="text-sm">Project Focus :</span>
              <span className="ml-4 w-[50%]">
                <Badge category={targetProject.focus} />
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
                <span className="text-xs">Links :</span>
                {targetProjectLinks ? (
                  targetProjectLinks.map((link) => (
                    <li key={link.id}>
                      <Link href={link.link}>
                        <span className="text-sm font-bold text-secondary-dark">
                          {link.text}
                        </span>
                      </Link>
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
                {targetProjectDocuments ? (
                  targetProjectDocuments.map((document) => (
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
