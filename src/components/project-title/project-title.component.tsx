import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Projects } from "@/types";
import { UserContext } from "@/contexts/user.context";

interface Props {
  project: Projects | null;
}

const ProjectTitle: React.FC<Props> = ({ project }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(project!.name);
  const { isAdmin } = useContext(UserContext);

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
    // setTitle(editName);
    setEdit(false);
  };

  const handleDelete = () => {
    // links && setLinks(links.filter((item) => item.id !== link!.id));
  };

  return (
    <>
      {isAdmin ? (
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
            <span className="font-bold">{project!.name || "Untitled"}</span>
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
        <span className="font-bold">{project!.name}</span>
      )}
    </>
  );
};

export default ProjectTitle;
