import React, { createContext, useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import {
  getAllProjects,
  getProjectLinks,
  getProjectDocuments,
  getTeamMembers,
  loadSingleProject,
  checkPriviledges,
} from "@/tools/supabase";
import type { Documents, Links, Projects, Team } from "@/types";
import type { SetStateAction, ReactNode } from "react";

interface ProjectsContext {
  projects: Projects[] | null;
  project: Projects | null;
  setProject: React.Dispatch<SetStateAction<Projects | null>> | null;
  links: Links[] | null;
  setLinks: React.Dispatch<SetStateAction<Links[] | null>> | null;
  documents: Documents[] | null;
  setDocuments: React.Dispatch<SetStateAction<Documents[] | null>> | null;
  team: Team | null;
  isOwner: boolean;
}

export const ProjectsContext = createContext<ProjectsContext>({
  projects: null,
  project: null,
  setProject: () => null,
  links: null,
  setLinks: () => null,
  documents: null,
  setDocuments: () => null,
  team: null,
  isOwner: false,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const [projects, setProjects] = useState<Projects[] | null>(null);
  const [project, setProject] = useState<Projects | null>(null);
  const [links, setLinks] = useState<Links[] | null>(null);
  const [documents, setDocuments] = useState<Documents[] | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const value = {
    projects,
    project,
    setProject,
    links,
    setLinks,
    documents,
    setDocuments,
    team,
    isOwner,
  };

  useEffect(() => {
    if (!projects) {
      async function loadAllProject() {
        const { data } = await getAllProjects();
        return data;
      }

      loadAllProject()
        .then((projects) => {
          if (projects) {
            console.log("projects from context : ", projects);
            setProjects(projects);
          } else {
            setProject(null);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [projects]);

  useEffect(() => {
    if (project && user) {
      if (project) {
        loadSingleProject(project.id)
          .then((project) => {
            if (project) setProject(project);
          })
          .catch((error) => console.log(error));
      } else {
        setProject(null);
      }
    }
  }, [project, user]);

  useEffect(() => {
    if (user) {
      if (user) {
        checkPriviledges(user.id)
          .then((admin) => {
            if (admin) setIsOwner(true);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [user]);

  useEffect(() => {
    if (project) {
      const fetchProjectLinks = async () => {
        return await getProjectLinks(project);
      };
      fetchProjectLinks()
        .then(({ data }) => {
          if (data) {
            setLinks(data);
            console.log(data);
          }
        })
        .catch((error) => console.log(error));
      // .finally(() => setLoading(false));
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      const fetchProjectDocuments = async () => {
        return await getProjectDocuments(project);
      };
      fetchProjectDocuments()
        .then(({ data }) => {
          if (data) {
            setDocuments(data);
            console.log(data);
          }
        })
        .catch((error) => console.log(error));
      // .finally(() => setLoading(false));
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      const fetchTeamMembers = async () => {
        return await getTeamMembers(project.id);
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
  }, [project]);

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
