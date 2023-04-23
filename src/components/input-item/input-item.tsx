import React, { useRef, useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
// import { MdDone } from "react-icons/md";
import type { Projects } from "@/types";

interface Props {
  hasDoneIcon?: boolean;
  project: Projects;
  projects: Projects[];
  setProjects: React.Dispatch<React.SetStateAction<Projects[]>>;
}

const InputItem: React.FC<Props> = ({
  hasDoneIcon = true,
  project,
  projects,
  setProjects,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(project.name);

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
    setProjects(
      projects.map((item) =>
        item.id === project.id ? { ...item, name: editName } : item
      )
    );
    setEdit(false);
  };

  const handleDelete = () => {
    setProjects(projects.filter((item) => item.id !== project.id));
  };

  // const handleDone = () => {
  //   setProjects(
  //       projects.map((item) =>
  //       item.id === project.id ? { ...item, isDone: !project.isDone } : item
  //     )
  //   );
  // };

  console.log("now is :", Date.now());
  console.log("project ends at :", project.ends_at);

  return (
    <form
      className="bg-yellow-300 mt-[15px] flex  w-full rounded-md p-[20px] transition hover:scale-105 hover:shadow-md"
      onSubmit={handleEditNameSubmit}
    >
      {edit ? (
        <input
          autoFocus
          className="text-black flex-1 rounded-md px-1 py-2 outline-none"
          type="text"
          ref={inputRef}
          value={editName}
          onChange={handleEditNameChange}
        />
      ) : (
        <span className="flex-1">{project.name}</span>
      )}
      <div className="flex gap-1">
        <span
          className="ml-[10px] cursor-pointer text-[25px]"
          onClick={handleEdit}
        >
          <AiFillEdit />
        </span>
        <span
          className="ml-[10px] cursor-pointer text-[25px]"
          onClick={handleDelete}
        >
          <AiFillDelete />
        </span>
        {/* {hasDoneIcon && (
          <span
            className="ml-[10px] cursor-pointer text-[25px]"
            onClick={handleDone}
          >
            <MdDone />
          </span>
        )} */}
      </div>
    </form>
  );
};

export default InputItem;
