import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Projects } from "@/types";
import { UserContext } from "@/contexts/user.context";
import { updateRecord } from "@/tools/supabase";
import { toast } from "react-hot-toast";
import type { SetStateAction } from "react";

interface Props {
  project: Projects;
  projects: Projects[] | null;
  setProjects: React.Dispatch<SetStateAction<Projects[] | null>>;
}

const Title: React.FC<Props> = ({ project, projects, setProjects }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(project.name);
  const { adminUI } = useContext(UserContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleEditNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editName) {
      toast.error("Title is empty !");
    } else {
      toast
        .promise(
          (async () => {
            const db = "projects";
            const data = await updateRecord(
              {
                id: project.id,
                name: editName,
                created_at: project.created_at,
                starts_at: project.starts_at,
                ends_at: project.ends_at,
                description: project.description,
                focus: project.focus,
                logo: project.logo,
                image: project.image,
              } as Projects,
              db
            );
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating link..",
            success: () => {
              setProjects(
                projects!.map((item) =>
                  item.id === project.id ? { ...item, name: editName } : item
                )
              );
              return <b>Project name updated !</b>;
            },
            error: <b>Error updating project name !</b>,
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
      {adminUI ? (
        <form
          className="flex w-full items-center"
          onSubmit={handleEditNameSubmit}
        >
          {edit ? (
            <input
              autoFocus
              className="w-[50%] flex-1 rounded-md px-1 text-[#000] outline-none"
              type="text"
              ref={inputRef}
              value={editName}
              onChange={handleEditNameChange}
            />
          ) : (
            <span className="font-bold">{project.name || "Untitled"}</span>
          )}
          <div className="flex items-center gap-1">
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
            <span
              className="ml-[10px] cursor-pointer text-[25px]"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </span>
          </div>
        </form>
      ) : (
        <span className="font-bold">{project.name}</span>
      )}
    </>
  );
};

export default Title;
