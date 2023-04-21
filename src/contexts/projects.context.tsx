import React, { createContext, useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { getAllProjects } from "@/tools/supabase";
import type { Database } from "@/types/supabase";
import type { Projects } from "@/types";
import type { SetStateAction, ReactNode } from "react";

interface ProjectsContext {
  projects: Projects[] | null;
  currentProject: Projects | null;
  setCurrentProject: React.Dispatch<SetStateAction<Projects | null>> | null;
  isOwner: boolean;
}

export const ProjectsContext = createContext<ProjectsContext>({
  projects: null,
  currentProject: null,
  setCurrentProject: () => null,
  isOwner: false,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [projects, setProjects] = useState<Projects[] | null>(null);
  const [currentProject, setCurrentProject] = useState<Projects | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const value = {
    projects,
    currentProject,
    setCurrentProject,
    supabase,
    isOwner,
  };

  useEffect(() => {
    // const unsubscribe = onAuthStateChangeListener(user => {
    //   console.log(user)
    // })
    if (user) {
      async function loadAllProject() {
        const { data } = await getAllProjects();
        console.log(data);
        return data;
      }
      // Only run query once user is logged in.
      if (currentProject) {
        loadAllProject()
          .then((projects) => {
            console.log(projects);
            if (projects) setProjects(projects);
          })
          .catch((error) => console.log(error));
      } else {
        setCurrentProject(null);
      }
    }
  }, [user]);

  useEffect(() => {
    // const unsubscribe = onAuthStateChangeListener(user => {
    //   console.log(user)
    // })
    if (currentProject) {
      async function loadSingleProject(id: string) {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();
        console.log(data);
        if (data) return data;
      }
      // Only run query once user is logged in.
      if (currentProject) {
        loadSingleProject(currentProject.id)
          .then((project) => {
            if (project) setCurrentProject(project);
          })
          .catch((error) => console.log(error));
      } else {
        setCurrentProject(null);
      }
    }
  }, [currentProject]);

  useEffect(() => {
    if (user) {
      async function checkPriviledges(userId: string) {
        const { data } = await supabase
          .from("admins")
          .select("*")
          .eq("id", userId);
        if (data) return data[0];
      }
      if (user) {
        checkPriviledges(user.id)
          .then((admin) => {
            if (admin) setIsOwner(true);
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
