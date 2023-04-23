import { useContext, useEffect, useState } from "react";
import {
  getDeliverables,
  getProjectFeedbacks,
  getProjectLinks,
  getTeamMembers,
} from "@/tools/supabase";
import { UserContext } from "@/contexts/user.context";
import ProjectCard from "@/components/project-card/project-card.component";
import ProjectDetails from "@/components/project-details/project-details.component";
import { Deliverable } from "@/components/deliverable/deliverable.component";
import FeedbackPreview from "@/components/feedback-preview/feedback-preview.component";
import { CategoryEnum } from "@/constants";
import type {
  Projects,
  Deliverables,
  Feedbacks,
  Links,
  Documents,
  Team,
} from "@/types";
import type { FC } from "react";
import { Router, useRouter } from "next/router";
import Spinner from "@/components/spinner/Spinner";
import { TeamMember } from "@/components/team-member/team-member.component";

interface Props {
  projects: Projects[];
}

export const ReviewerView: FC<Props> = ({ projects }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Projects>();
  const [deliverables, setDeliverables] = useState<Deliverables[]>();
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([]);
  const [filterCategory, setFilterCategory] = useState<CategoryEnum>();
  const [links, setLinks] = useState<Links[] | null>(null);
  const [documents, setDocuments] = useState<Documents[] | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchDeliverables = async (projectId: string) => {
      return await getDeliverables(projectId);
    };
    if (selectedProject) {
      setLoading(true);
      fetchDeliverables(selectedProject.id)
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

      getProjectFeedbacks(selectedProject)
        .then(({ data }) => {
          console.log(data);
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
        return await getTeamMembers(selectedProject.id);
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

  return (
    <div className="flex w-[100vw] max-w-full">
      <div className="flex h-[calc(100vh-67.5px)] w-[25vw] flex-col border-r border-t border-l border-primary">
        <div className="w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
          Projects
        </div>
        <div className="form-control mx-auto mt-4">
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
        <ul className="mt-0 w-full pt-2">
          {projects?.map((project) => (
            <li className="ml-0 mt-4 list-none" key={project.id}>
              <ProjectCard
                project={project}
                onClick={() => {
                  setSelectedProject(project);
                }}
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
                onClick={() => {
                  router
                    .push(
                      {
                        pathname: "/feedback",
                        query: { id: selectedProject.id },
                      },
                      "/feedback"
                    )
                    .catch((error) => console.log(error));
                }}
              >
                Add Feedback
              </button>
            </div>
            <div className="mx-auto mt-8 min-h-[150px] w-full max-w-[88%] rounded-xl bg-primary-dark p-4 pb-8">
              <h3 className="p-1 font-bold">Deliverables</h3>
              <div className="grid grid-cols-2 gap-4">
                {deliverables ? (
                  deliverables.map((deliverable) => (
                    <Deliverable
                      deliverable={deliverable}
                      key={deliverable.id}
                    />
                  ))
                ) : (
                  <div className="w-full text-center text-sm">
                    this project has no deliverables yet !
                  </div>
                )}
              </div>
            </div>
            <div className="mx-auto mt-8 min-h-[150px] w-full max-w-[88%] rounded-xl bg-primary-dark p-4 pb-8">
              <h3 className="p-1 font-bold">Team Members</h3>
              <div className="grid grid-cols-2 gap-4">
                {team ? (
                  team.map((member) => (
                    <TeamMember
                      avatar_url={member.avatar_url!}
                      full_name={member.full_name!}
                      key={member.id}
                    />
                  ))
                ) : (
                  <div className="w-full text-center text-sm">
                    this project has no members yet !
                  </div>
                )}
              </div>
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
              {feedbacks &&
                feedbacks.map((feedback) => (
                  <FeedbackPreview
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
        <ProjectDetails
          project={selectedProject}
          links={links}
          setLinks={setLinks}
          documents={documents}
          setDocuments={setDocuments}
        />
      )}
    </div>
  );
};
