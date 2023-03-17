import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

import { getProjects } from "./get-projects";
import { createProject } from "./create-project";

export const client = createTRPCRouter({
  getProjects,
  createProject,
});
