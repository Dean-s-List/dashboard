import { useState, useEffect } from "react";
import { Deliverable } from "@/components/deliverable/deliverable.component";
import ProjectDetails from "@/components/project-details/project-details.component";

import {
  addProject,
  getDeliverables,
  getProjectDocuments,
  getProjectLinks,
} from "@/tools/supabase";
import { addDeliverable } from "@/tools/supabase";
import { CategoryEnum } from "@/constants";

import type { Deliverables, Projects, Links, Documents } from "@/types";
import type { FC } from "react";

interface Props {
  projects: Projects[];
}

export const AdminView: FC<Props> = ({ projects }) => {
  const [loading, setLoading] = useState(true);

  const [deliverableName, setDeliverableName] = useState<string>("");
  const [deliverableDate, setDeliverableDate] = useState<string>("");
  const [deliverableCategory, setDeliverableCategory] =
    useState<CategoryEnum>();
  const [deliverableTargetProject, setDeliverableTargetProject] =
    useState<string>("");
  const [deliverables, setDeliverables] = useState<Deliverables[] | null>(null);
  const [sessionName, setSessionName] = useState<string | null>(null);
  const [sessionStart, setSessionStart] = useState<string | null>(null);
  const [sessionEnd, setSessionEnd] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
  const [links, setLinks] = useState<Links[] | null>(null);
  const [documents, setDocuments] = useState<Documents[] | null>(null);

  useEffect(() => {
    const fetchDeliverables = async (projectId: string) => {
      return await getDeliverables(projectId);
    };
    if (selectedProject) {
      fetchDeliverables(selectedProject.id)
        .then(({ data }) => {
          if (data) {
            setDeliverables(data);
            console.log(data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      const fetchLinks = async (project: Projects) => {
        return await getProjectLinks(project);
      };
      if (selectedProject) {
        fetchLinks(selectedProject)
          .then(({ data }) => {
            if (data) {
              setLinks(data);
              console.log(data);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      const fetchLinks = async (project: Projects) => {
        return await getProjectDocuments(project);
      };
      if (selectedProject) {
        fetchLinks(selectedProject)
          .then(({ data }) => {
            if (data) {
              setDocuments(data);
              console.log(data);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [selectedProject]);

  return (
    <div className="flex max-w-full">
      <div className="w-[25vw] border-l border-t bg-primary-dark">
        <form
          className="flex w-full flex-col items-center justify-center px-2"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(event);
            if (
              sessionName &&
              sessionName?.length > 3 &&
              sessionStart &&
              sessionEnd
            ) {
              addProject({
                name: sessionName,
                starts_at: sessionStart,
                ends_at: sessionEnd,
              }).catch((error) => console.log(error));
            }
          }}
        >
          <h2 className="mt-8 text-xl font-bold">
            Register a Feedback Session :
          </h2>

          <label className="input-group mt-2" htmlFor="session_name">
            <span className="w-[25%]">name :</span>
            <input
              type="text"
              placeholder="ex : Backpack"
              className="input-borderless input w-[75%]"
              id="session_name"
              onChange={(e) => setSessionName(e.target.value)}
              required
            />
          </label>
          <label className="input-group mt-1" htmlFor="session_start">
            <span className="w-[25%]">starts :</span>
            <input
              type="date"
              className="input-borderless input w-[75%]"
              id="session_start"
              onChange={(e) => setSessionStart(e.target.value)}
              required
            />
          </label>
          <label className="input-group mt-1" htmlFor="session_end">
            <span className="w-[25%]">ends :</span>
            <input
              type="date"
              className="input-borderless input w-[75%]"
              id="session_end"
              onChange={(e) => setSessionEnd(e.target.value)}
              required
            />
          </label>
          <button
            className="btn-info btn mx-auto text-xs lowercase"
            type="submit"
          >
            Add
          </button>
        </form>

        <form
          className="mt-8 flex w-full flex-col items-center justify-center px-2"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (projects && projects?.length > 0 && deliverableCategory) {
              const [projectId] = projects?.filter((project) => project.name);
              const { id } = projectId!;
              if (projectId) {
                addDeliverable({
                  project: id,
                  name: deliverableName,
                  category: deliverableCategory,
                  due_date: deliverableDate,
                }).catch((error) => console.log(error));
              }
              setDeliverableName("");
              setDeliverableDate("");
            }
          }}
        >
          <span className="text-xl font-bold"> Add deliverable :</span>
          <select
            className="select-bordered select mt-2 w-full"
            onChange={(e) => setDeliverableTargetProject(e.target.value)}
            required
          >
            <option disabled selected>
              Target Project
            </option>
            {projects &&
              projects.map((project) => {
                return <option key={project.id}>{project.name}</option>;
              })}
          </select>
          <label className="input-group mt-1" htmlFor="deliverable_name">
            <span className="w-[25%]">name :</span>
            <input
              type="text"
              placeholder="ex : Soladex.io Review"
              className="input-borderless input w-[75%]"
              id="deliverable_name"
              value={deliverableName}
              onChange={(e) => setDeliverableName(e.target.value)}
            />
          </label>
          <label className="input-group mt-1" htmlFor="deliverable_date">
            <span className="w-[25%]">date :</span>
            <input
              type="date"
              className="input-borderless input w-[75%]"
              id="deliverable_date"
              value={deliverableDate}
              onChange={(e) => setDeliverableDate(e.target.value)}
            />
          </label>
          <select
            className="select-bordered select mt-1 w-full"
            onChange={(e) => {
              switch (e.target.value) {
                case "UX/UI":
                  setDeliverableCategory(CategoryEnum.UXUI);
                  break;
                case "Documentation":
                  setDeliverableCategory(CategoryEnum.Docs);
                  break;
                case "Business/Strategy":
                  setDeliverableCategory(CategoryEnum.Strategy);
                  break;
                case "Community":
                  setDeliverableCategory(CategoryEnum.Community);
                  break;
              }
            }}
          >
            <option disabled selected>
              Category
            </option>

            <option>UX/UI</option>
            <option>Documentation</option>
            <option>Business/Strategy</option>
            <option>Community</option>
          </select>
          <button
            className="btn-info btn mx-auto text-xs lowercase"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <div className="bg-black h-[calc(100vh-67.5px)] w-[25vw] border-t bg-[#000]">
        <ul className="mt-0 w-full pt-8">
          {projects?.map((project) => (
            <li className="ml-0 list-none" key={project.id}>
              <div
                className="card mx-8 w-96 cursor-pointer bg-base-100 shadow-xl"
                onClick={() => {
                  setSelectedProject(project);
                }}
              >
                <div className="card-body">
                  <h2 className="card-title">{project.name}</h2>
                  <hr />
                  <div className="flex w-full">
                    <span className="w-[50%] text-left">UX/UI</span>{" "}
                    <span className="badge badge-md w-[50%] font-bold text-success">
                      Active
                    </span>
                  </div>
                  <div className="card-actions justify-end">
                    <div className="flex w-full">
                      <span className="w-[50%] text-left">Timeframe :</span>{" "}
                      <span className="flex w-[50%] justify-end space-x-10 font-bold">
                        <span>
                          {project.starts_at.split("-")[2]}-
                          {project.starts_at.split("-")[1]}
                        </span>
                        <span>
                          {project.ends_at.split("-")[2]}-
                          {project.ends_at.split("-")[1]}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[calc(100vh-67.5px)] w-[25vw] bg-[#fff] text-[#000]">
        <h2 className="m-8 text-xl font-bold">Deliverables :</h2>
        {deliverables ? (
          deliverables.map((deliverable) => (
            <div
              className="mx-auto mt-1 flex flex h-[92px] w-full max-w-[331px] list-none items-center justify-center rounded-xl bg-primary-darker shadow-md"
              key={deliverable.id}
            >
              <Deliverable deliverable={deliverable} />
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            this project has no deliverables yet !
          </div>
        )}
      </div>
      <div className="bg-white flex h-[calc(100vh-67.5px)] w-[25vw] flex-col border-t">
        <div className="w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
          Project Details
        </div>
        {selectedProject ? (
          <ProjectDetails
            project={selectedProject}
            links={links}
            documents={documents}
          />
        ) : (
          <div>Please select a project !</div>
        )}
      </div>
    </div>
  );
};
