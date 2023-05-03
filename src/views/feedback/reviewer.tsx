import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { UserContext } from "@/contexts/user.context";
import { ProjectsContext } from "@/contexts/projects.context";
import PlateEditor from "@/components/editor/plate.component";
import LinkItem from "@/components/link-item/link-item.component";
import { Badge } from "@/components/badge/badge.component";
import {
  addFeedback,
  getCurrentUserFeedbacks,
  getProjectLinks,
  updateRecord,
} from "@/tools/supabase";
import { numericalToString } from "@/tools/core/month";
import {
  ChevronLeftIcon,
  DocumentIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import { CategoryEnum } from "@/constants";
// Types
import type { Documents, Feedbacks, Links, Profiles, Projects } from "@/types";
import type { FC } from "react";
import type { MyValue } from "@/components/editor/typescript/plateTypes";
import type { Json } from "@/types/supabase";

interface Props {
  draft: Feedbacks | null;
  currentProject: Projects | null;
}

export const ReviewerFeedback: FC<Props> = ({ draft, currentProject }) => {
  const [value, setValue] = useState<MyValue | Json | undefined>();
  const { currentUser, adminUI } = useContext(UserContext);
  const { projects, documents } = useContext(ProjectsContext);
  const [userAgent, setUserAgent] = useState<string>();
  const [project, setProject] = useState<Projects | null>(currentProject);
  const [category, setCategory] = useState<CategoryEnum>();
  const [links, setLinks] = useState<Links[] | null>(null);
  const [feedback, setFeedback] = useState<Feedbacks | null>(
    draft ? draft : null
  );
  const [userDrafts, setUserDrafts] = useState<Feedbacks[] | null>(null);

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
    if (feedback) {
      setValue(feedback.content);
    }
  }, [feedback]);

  useEffect(() => {
    const fetchUserFeedback = async (user: Profiles) => {
      return await getCurrentUserFeedbacks(user);
    };
    if (currentUser) {
      fetchUserFeedback(currentUser)
        .then((data) => {
          if (data) {
            setUserDrafts(data.filter((draft) => draft.published == false));
            console.log("user drafts : ", data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

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
  }, []);

  useEffect(() => {
    if (feedback) {
      setValue(JSON.parse(feedback.content as string) as MyValue);
    }
  }, [feedback]);

  const nameToProject = (projects: Projects[], str: string) => {
    const [project] = projects.filter((project) => project.name == str);
    return project;
  };

  const idToFeedback = (drafts: Feedbacks[], str: string) => {
    if (userDrafts) {
      const [draft] = drafts?.filter((draft) => draft.id == str);
      return draft;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!project || !category) {
      switch (!project || !category || !currentUser || !value) {
        case !currentUser:
          toast.error("No project selected !");
          break;
        case !category:
          toast.error("No category selected !");
          break;
        case !value:
          toast.error("Feedback is empty !");
          break;
      }
    } else {
      const db = "feedbacks";
      toast
        .promise(
          updateRecord(
            {
              id: feedback!.id,
              title: feedback?.title || "Untilted",
              user_id: feedback!.user_id,
              project: feedback!.project,
              content: JSON.stringify(value),
              category: category,
              published: true,
              user_agent: feedback!.user_agent,
              avatar_url: feedback!.avatar_url,
              created_at: feedback!.created_at,
            },
            db
          ),
          {
            loading: "Publishing feedback..",
            success: () => {
              return (
                <b>
                  Feedback published !
                  {/* {res?.id && (
                    <Link href={`/feedback/${res.id}`} className="ml-1">
                      <LinkIcon className="h-4 w-4" />
                    </Link>
                  )} */}
                </b>
              );
            },
            error: <b>Error publishing feedback !</b>,
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
                  return <option key={project.id}>{project.name}</option>;
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
                defaultValue={"Choose"}
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
                {links && links.length > 0 ? (
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
                {documents && documents.length > 0 ? (
                  documents.map((document) => (
                    <li key={document.id}>
                      <DocumentIcon className="h-6 w-6" />
                      <Link href={document.link}>
                        <span className="font-bold text-info">
                          {document.text}
                        </span>
                      </Link>
                      <span>{document.uploaded_at}</span>
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
          <div className="w-full justify-start">
            <span className="text-sm">Drafts :</span>
            <select
              className="select-bordered select ml-4 justify-start"
              defaultValue={feedback?.id || "Choose"}
              onChange={(e) => {
                if (e.target.value && userDrafts)
                  setFeedback(idToFeedback(userDrafts, e.target.value)!);
              }}
              required
            >
              <option disabled>Choose</option>
              {userDrafts?.map((draft) => {
                return <option key={draft.id}>{draft.id}</option>;
              })}
            </select>
          </div>

          <button
            className="btn-secondary btn-sm btn mr-4 capitalize"
            type="submit"
          >
            Publish
          </button>
        </div>
        {feedback ? (
          <PlateEditor
            value={value}
            setValue={setValue}
            feedback={feedback}
            currentUser={currentUser}
            isOwner={true}
            adminUI={adminUI}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#000]">
            please select a draft or create one
          </div>
        )}
      </div>
    </form>
  );
};
