import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Projects } from "@/types";
import { updateProject } from "@/tools/supabase";

interface Props {
  project: Projects;
  projects: Projects[] | null;
  setProjects: React.Dispatch<React.SetStateAction<Projects[] | null>>;
  description: string;
  isAdmin: boolean;
}

const ProjectDescription: React.FC<Props> = ({
  project,
  projects,
  setProjects,
  isAdmin,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<string | null>(
    project.description
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDescription(e.target.value);
  };

  const handleEditNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editDescription) {
      toast.error("Title is empty !");
    } else {
      toast
        .promise(
          (async () => {
            const data = await updateProject({
              id: project.id,
              name: project.name,
              created_at: project.created_at,
              starts_at: project.starts_at,
              ends_at: project.ends_at,
              description: project.description,
              focus: project.focus,
              logo: project.logo,
              image: project.image,
            });
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating description..",
            success: () => {
              setProjects(
                projects!.map((item) =>
                  item.id === project.id
                    ? { ...item, description: editDescription }
                    : item
                )
              );
              return <b>Project description updated !</b>;
            },
            error: <b>Error updating project description !</b>,
          }
        )
        .catch((error) => console.log(error));
    }
    setEdit(false);
  };

  const handleDelete = () => {
    // links && setLinks(links.filter((item) => item.id !== link!.id));
  };

  return (
    <>
      {isAdmin ? (
        <form
          className="flex w-full flex-col items-center"
          onSubmit={handleEditNameSubmit}
        >
          {edit ? (
            <textarea
              autoFocus
              className="textarea-bordered textarea mx-auto mb-2 h-full w-[100%] resize-none border-primary"
              placeholder="Much wow !"
              ref={inputRef}
              value={editDescription!}
              onChange={() => handleEditNameChange}
            ></textarea>
          ) : (
            <div className="flex flex-col">
              <span className="text-xs">Description :</span>
              <p className={`relative mt-2 text-justify text-xs `}>
                {project.description}
              </p>
            </div>
          )}
          <div className="flex gap-1">
            <span
              className="ml-[10px] cursor-pointer text-[25px]"
              onClick={handleEdit}
            >
              {!edit ? (
                <AiFillEdit />
              ) : (
                <button type="submit">
                  <MdDone />
                </button>
              )}
            </span>
            {/* <span
              className="ml-[10px] cursor-pointer text-[25px]"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </span> */}
          </div>
        </form>
      ) : (
        <div className="flex flex-col">
          <span className="text-xs">Description :</span>
          <p className="mt-2 text-justify text-xs">{project.description}</p>
        </div>
      )}
    </>
  );
};

export default ProjectDescription;
