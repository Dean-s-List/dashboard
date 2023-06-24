import React, { useContext, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { UserContext } from "@/contexts/user.context";
//
import Project from "@/components/project/project.component";
import Details from "@/components/project/project.details";
import AdminProject from "@/components/project/project.admin";
//
import Deliverable from "@/components/deliverable";
import AdminDeliverable from "@/components/deliverable/deliverable.admin";
//
import TeamMember from "@/components/team-member/team-member.component";
import Spinner from "@/components/spinner/spinner.component";
//
import Feedback from "@/components/feedback/feedback.component";
import { CategoryEnum } from "@/constants";
import {
  addFeedback,
  getDeliverables,
  getProjectFeedbacks,
  getProjectLinks,
  getPublishedFeedbacks,
  getTeamMembers,
} from "@/tools/supabase";
import { LinkIcon, PlusIcon, PlusSmallIcon } from "@heroicons/react/24/solid";

import type {
  Projects,
  Deliverables,
  Feedbacks,
  Links,
  Documents,
  Team,
} from "@/types";
import type { FC, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Props {
  projects: Projects[];
  setProjects: React.Dispatch<SetStateAction<Projects[] | null>>;
}

export const ReviewerView: FC<Props> = ({ projects, setProjects }) => {
  const { currentUser, adminUI } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Projects>();
  const [deliverables, setDeliverables] = useState<Deliverables[] | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([]);
  const [filterCategory, setFilterCategory] = useState<CategoryEnum>();
  const [links, setLinks] = useState<Links[] | null>(null);
  const [documents, setDocuments] = useState<Documents[] | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [description, setDescription] = useState<string>("");
  const [createProjectPopUp, setCreateProjectPopUp] = useState(false);
  const [createDeliverablePopUp, setCreateDeliverablePopUp] = useState(false);
  const [userAgent, setUserAgent] = useState<string>();

  const router = useRouter();
  useEffect(() => {
    const fetchDeliverables = async (projectId: string) => {
      return await getDeliverables(projectId);
    };
    if (selectedProject) {
      setLoading(true);
      fetchDeliverables(selectedProject.id!)
        .then(({ data }) => {
          if (data) {
            setDeliverables(data);
            console.log("deliverables : ", data);
          }
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 1000);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    const fetchLinks = async (project: Projects) => {
      return await getProjectLinks(project);
    };
    if (selectedProject) {
      setLoading(true);
      fetchLinks(selectedProject)
        .then(({ data }) => {
          if (data) {
            setLinks(data);
            console.log("links : ", data);
          }
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 1000);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      setLoading(true);

      getPublishedFeedbacks(selectedProject.id!)
        .then((data) => {
          console.log({ data });
          if (data) setFeedbacks(data);
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 1000);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      const fetchTeamMembers = async () => {
        return await getTeamMembers(selectedProject.id!);
      };
      fetchTeamMembers()
        .then((data) => {
          if (data) {
            setTeam(data);
            console.log("team : ", data);
          }
        })
        .catch((error) => console.log(error));
      // .finally(() => setLoading(false));
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      setDescription(selectedProject.description!);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (window.navigator.userAgent) {
      console.log(window.navigator.userAgent);
      setUserAgent(window.navigator.userAgent);
    }
  }, []);

  const toogleCreateProjectPopUp = () => {
    setCreateProjectPopUp(!createProjectPopUp);
  };

  const toogleCreateDeliverablePopUp = () => {
    setCreateDeliverablePopUp(!createDeliverablePopUp);
  };

  const onClick = () => {
    // if (e) e.preventDefault();
    if (!currentUser || !selectedProject) {
      switch (!currentUser || !selectedProject) {
        case !currentUser:
          toast.error("No user found !");
          break;
        case !selectedProject:
          toast.error("No project selected !");
          break;
      }
    } else {
      toast
        .promise(
          addFeedback({
            id: null,
            title: null,
            user_id: currentUser.id,
            project: selectedProject.id!,
            // content: JSON.stringify(value),
            content: null,
            category: null,
            published: false,
            user_agent: userAgent!,
            avatar_url: currentUser.avatar_url,
            created_at: null,
            owner: null,
            avg_stars: null,
            stars_count: null,
            action_taken: false,
          } as Feedbacks),
          {
            loading: "Creating draft..",
            success: (res) => {
              router
                .push(
                  {
                    pathname: "/feedback",
                    query: { id: selectedProject.id, draft: res?.id },
                  },
                  "/feedback"
                )
                .catch((error) => console.log(error));
              return (
                <b>
                  Draft created !
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

        .catch((error) => console.log(error));
    }
  };

  const today = new Date()
    .toLocaleString("en-US", { timeZone: "UTC" })
    .split(",")[0]
    ?.replace("/", "-")
    .replace("/", "-");
  console.log(today);

  const [month, day, year] = today!.split("-");

  const date = [month!, day!, year!];

  console.log(
    `today's month is ${month!}, day is  ${day!} and year is  ${year!}`
  );

  return (
    <>
      {createProjectPopUp && (
        <AdminProject toogleCreateProjectPopUp={toogleCreateProjectPopUp} />
      )}
      {createDeliverablePopUp && (
        <AdminDeliverable
          toogleCreateDeliverablePopUp={toogleCreateDeliverablePopUp}
        />
      )}

      <div className="flex w-[100vw] max-w-full">
        <div className="flex h-[calc(100vh-67.5px)] w-[25vw] flex-col overflow-y-scroll border-r border-t border-l border-primary">
          <div className="w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
            Projects
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="form-control mx-auto">
              <div className="input-group">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search…"
                  className="input-borderless input"
                />
              </div>
            </div>
            {adminUI && (
              <button onClick={toogleCreateProjectPopUp} className="mr-8">
                <PlusIcon className="h-6 w-6" />
              </button>
            )}
          </div>
          <ul className="mt-0 w-full pt-2">
            {projects?.map((project) => (
              <li className="ml-0 mt-4 list-none" key={project.id}>
                <Project
                  project={project}
                  projects={projects}
                  setProjects={setProjects}
                  onClick={() => setSelectedProject(project)}
                  date={date}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`bg-black flex h-[calc(100vh-67.5px)] flex-col w-[${
            !selectedProject ? "100%" : "100%"
          }] items-center overflow-y-scroll border-t border-primary bg-[#000] pt-8`}
        >
          {" "}
          {!loading && selectedProject ? (
            <div className="static flex flex-col">
              <div className="justify- relative top-0 mx-auto flex w-[95%] items-center">
                <h2 className="w-[100%] text-2xl font-bold">
                  {selectedProject.name}
                </h2>
                <button
                  className="btn-secondary btn-sm btn capitalize "
                  onClick={onClick}
                >
                  Add Feedback
                </button>
              </div>
              <div className="mx-auto mt-8 min-h-[150px] w-full max-w-[100%] rounded-xl bg-primary-dark p-4 pb-8">
                <div className="flex items-center">
                  <h3 className="p-1 font-bold">Deliverables</h3>
                  {adminUI && (
                    <button
                      onClick={toogleCreateDeliverablePopUp}
                      className="mr-8"
                    >
                      <PlusSmallIcon className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {deliverables && deliverables.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {deliverables.map((deliverable) => (
                      <Deliverable
                        deliverable={deliverable}
                        deliverables={deliverables}
                        setDeliverables={setDeliverables}
                        key={deliverable.id}
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-[331px] max-w-[331px]"></div>
                      <div className="w-[331px] max-w-[331px]"></div>
                    </div>
                    <div className="mt-4 w-full text-center text-sm">
                      this project has no deliverables yet !
                    </div>
                  </>
                )}
              </div>
              <div className="mx-auto mt-8 min-h-[150px] w-full max-w-[100%] rounded-xl bg-primary-dark p-4 pb-8">
                <h3 className="p-1 font-bold">Team Members</h3>
                {team && team.length > 0 ? (
                  <div className="grid w-full grid-cols-2 gap-4">
                    {team.map((member) => (
                      <TeamMember
                        avatar_url={member.avatar_url!}
                        full_name={member.full_name!}
                        key={member.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 w-full text-center text-sm">
                    this project has no members yet !
                  </div>
                )}
              </div>
              <div className="mx-auto mt-8 flex w-[88%] items-center justify-center space-x-8">
                <span className="w-full text-xl font-bold">Feedbacks</span>

                <div className="mx-auto flex w-full">
                  <div className="form-control">
                    <select
                      className="select-bordered select select-sm"
                      defaultValue={"Sort By : Show All"}
                      onChange={(e) => {
                        switch (e.target.value) {
                          case "UX/UI":
                            setFilterCategory(CategoryEnum.UXUI);
                            break;
                          case "Documentation":
                            setFilterCategory(CategoryEnum.Docs);
                            break;
                          case "Business/Strategy":
                            setFilterCategory(CategoryEnum.Strategy);
                            break;
                          case "Community":
                            setFilterCategory(CategoryEnum.Community);
                            break;
                        }
                      }}
                    >
                      <option disabled>Sort By : Show All</option>
                      <option>UX/UI</option>
                      <option>Documentation</option>
                      <option>Business/Strategy</option>
                      <option>Community</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <select
                      className="select-bordered select select-sm"
                      defaultValue={"Category : Show All"}
                      onChange={(e) => {
                        switch (e.target.value) {
                          case "UX/UI":
                            setFilterCategory(CategoryEnum.UXUI);
                            break;
                          case "Documentation":
                            setFilterCategory(CategoryEnum.Docs);
                            break;
                          case "Business/Strategy":
                            setFilterCategory(CategoryEnum.Strategy);
                            break;
                          case "Community":
                            setFilterCategory(CategoryEnum.Community);
                            break;
                        }
                      }}
                    >
                      <option disabled>Category : Show All</option>
                      <option>UX/UI</option>
                      <option>Documentation</option>
                      <option>Business/Strategy</option>
                      <option>Community</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="my-4 mx-auto grid w-[100%] grid-cols-2 gap-4">
                {!selectedProject.reviewing &&
                  feedbacks.map((feedback) => (
                    <Feedback
                      feedback={feedback}
                      project={selectedProject}
                      key={feedback.id}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-67.5px)] w-full flex-col items-center justify-center">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <span className="mb-8 text-5xl font-bold">
                    👋 hello {currentUser?.full_name}{" "}
                  </span>
                  <span className="lowercase">
                    start by picking a project on the left
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {selectedProject && (
          <Details
            project={selectedProject}
            projects={projects}
            setProjects={setProjects}
            links={links}
            setLinks={setLinks}
            documents={documents}
            // setDocuments={setDocuments}
            // description={description!}
            // setDescription={setDescription}
            adminUI={adminUI}
          />
        )}
      </div>
    </>
  );
};
