import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import type { CategoryEnum } from "@/constants";
import type { Feedbacks, Profiles, Projects, Comments } from "@/types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const addProject = async ({
  name,
  starts_at,
  ends_at,
}: {
  name: string;
  starts_at: string;
  ends_at: string;
  // startsAt: Date;
  // endsAt: Date;
}) => {
  const { error } = await supabase
    .from("projects")
    .insert({ name, starts_at, ends_at });
  if (error) console.log(error);
};

export const addDeliverable = async ({
  project,
  name,
  category,
  due_date,
}: {
  project: string;
  name: string;
  category: number;
  due_date: string;
}) => {
  const { error } = await supabase
    .from("deliverables")
    .insert({ project, name, due_date, category });
  if (error) console.log(error);
};

export const addFeedback = async ({
  user_id,
  title,
  project,
  content,
  category,
  published,
  user_agent,
  avatar_url,
}: Feedbacks) => {
  const { error } = await supabase.from("feedbacks").insert({
    user_id,
    title,
    project,
    content,
    category,
    published,
    user_agent,
    avatar_url,
  });
  if (error) console.log(error);
};

export const addComment = async ({ id, user_id, value, content }: Comments) => {
  const { error } = await supabase.from("comments").insert({
    id,
    user_id,
    value,
    content,
  });
  if (error) console.log(error);
};

export const getAllProjects = async () => {
  return await supabase.from("projects").select("*");
};

export const getAllFeedback = async () => {
  return await supabase.from("feedbacks").select("*");
};

export const getSingleFeedback = async (id: string) => {
  console.log("querying feedback with id : ", id);
  return await supabase.from("feedbacks").select("*").eq("id", id).single();
};

export const getSingleProject = async (id: string) => {
  console.log("querying project with id : ", id);
  return await supabase.from("projects").select("*").eq("id", id).single();
};

export const getAllUsers = async () => {
  return await supabase.from("profiles").select("*");
};

export const getCurrentUserFeedbacks = async (user: Profiles) => {
  return await supabase.from("feedbacks").select("*").eq("user_id", user.id);
};

export const getProjectFeedbacks = async (project: Projects) => {
  return await supabase.from("feedbacks").select("*").eq("project", project.id);
};

export const getProjectLinks = async (project: Projects) => {
  return await supabase.from("links").select("*").eq("project", project.id);
};

export const getProjectDocuments = async (project: Projects) => {
  return await supabase.from("documents").select("*").eq("project", project.id);
};

export const getAvatar = async (user_id: string) => {
  return await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", user_id)
    .single();
};

export const getDeliverables = async (projectId: string) => {
  return await supabase
    .from("deliverables")
    .select("*")
    .eq("project", projectId);
};

export const onAuthStateChangeListener = () => {
  return supabase.auth.onAuthStateChange((event: any, session: any) => {
    console.log(event, session);
  });
};
