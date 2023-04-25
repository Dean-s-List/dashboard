import React, { useRef, useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Deliverables, Projects } from "@/types";

interface Props {
  deliverable: Deliverables;
  deliverables: Deliverables[];
  setDeliverables: React.Dispatch<React.SetStateAction<Deliverables[]>>;
  project: Projects;
}

const InputItem: React.FC<Props> = ({
  deliverable,
  project,
  deliverables,
  setDeliverables,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(deliverable.name);

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
    setDeliverables(
      deliverables.map((item) =>
        item.id === project.id ? { ...item, name: editName } : item
      )
    );
    setEdit(false);
  };

  const handleDelete = () => {
    setDeliverables(deliverables.filter((item) => item.id !== deliverable.id));
  };

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
        <div className="text-md w-full font-bold">{`${deliverable.name}`}</div>
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
  );
};

export default InputItem;
