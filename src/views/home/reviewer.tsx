import { useContext, useEffect, useState } from "react";
import {
  getAllProjects,
  getDeliverables,
  getProjectFeedbacks,
} from "@/tools/supabase";
import { UserContext } from "@/contexts/user.context";
import Spinner from "@/components/spinner/Spinner";
import ProjectCard from "@/components/project-card/project-card.component";
import ProjectDetails from "@/components/project-details/project-details.component";
import { Deliverable } from "@/components/deliverable/deliverable.component";
import FeedbackPreview from "@/components/feedback-preview/feedback-preview.component";
import { CategoryEnum } from "@/constants";
import type { Projects, Deliverables, Feedbacks } from "@/types";
import type { FC } from "react";

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

  useEffect(() => {
    setLoading(true);
    const fetchDeliverables = async (projectId: string) => {
      return await getDeliverables(projectId);
    };
    if (selectedProject) {
      fetchDeliverables(selectedProject.id)
        .then(({ data }) => {
          if (data) {
            setDeliverables(data as any);
            console.log(data);
          }
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 1000);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    setLoading(true);
    if (selectedProject) {
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
                  setLoading(true);
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
        {selectedProject ? (
          <div className="static flex flex-col">
            <div className="relative top-0 flex w-full items-center justify-center space-x-96">
              <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
              <button className="btn-secondary btn-sm btn capitalize">
                Add Feedback
              </button>
            </div>
            <div className="mx-auto mt-8 min-h-[150px] w-[95%] rounded-xl bg-primary-dark p-4 pb-8">
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
                  <div className="w-full text-center">
                    this project has no deliverables yet !
                  </div>
                )}
              </div>
            </div>
            <div className="mx-auto mt-8 min-h-[200px] w-[95%] rounded-xl bg-primary-dark">
              <h3 className="p-4 font-bold">Team Members</h3>
              {/* {selectedProject.deliverables ? (
                selectedProject.deliverables.map((deliverable) => (
                  <div
                    className="mx-auto flex flex h-[92px] w-full max-w-[331px] list-none items-center justify-center rounded-xl bg-primary-darker shadow-md"
                    key={deliverable.id}
                  >
                    <Deliverable deliverable={deliverable} />
                  </div>
                ))
              ) : (
                <div>Nobody works on this yet !</div>
              )} */}
            </div>
            <div className="mt-8 flex w-full items-center px-8">
              <span className="w-full">Feedback</span>
              <div className="flex w-full space-x-4">
                <div className="form-control w-[50%] max-w-[50%]">
                  <select
                    className="select-bordered select"
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
                    <option disabled selected>
                      Sort By : Show All
                    </option>
                    <option>UX/UI</option>
                    <option>Documentation</option>
                    <option>Business/Strategy</option>
                    <option>Community</option>
                  </select>
                </div>
                <div className="form-control w-[50%] max-w-[50%]">
                  <select
                    className="select-bordered select"
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
                    <option disabled selected>
                      <span>Category :</span>{" "}
                      <span className="font-bold">Show All</span>
                    </option>
                    <option>UX/UI</option>
                    <option>Documentation</option>
                    <option>Business/Strategy</option>
                    <option>Community</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="my-4 mx-auto grid w-[95%] grid-cols-2 gap-4">
              {feedbacks &&
                currentUser &&
                feedbacks.map((feedback) => (
                  <FeedbackPreview
                    feedback={feedback}
                    project={selectedProject}
                    key={feedback.id}
                    currentUser={currentUser}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[calc(100vh-67.5px)] w-full flex-col items-center justify-center">
            <span className="mb-8 text-5xl font-bold">
              👋 hello {currentUser?.full_name}{" "}
            </span>
            <span className="lowercase">
              start by picking a project on the left
            </span>
          </div>
        )}
      </div>
      {selectedProject && <ProjectDetails project={selectedProject} />}
    </div>
  );
};
