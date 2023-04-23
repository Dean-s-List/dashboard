import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
// import { MdDone } from "react-icons/md";
import type { Feedbacks, Projects } from "@/types";
import Link from "next/link";
import { UserContext } from "@/contexts/user.context";

interface Props {
  feedback: Feedbacks | null;
  project: Projects | null;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  isOwner: boolean;
}

const FeedbackTitle: React.FC<Props> = ({
  feedback,
  project,
  setTitle,
  isOwner,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(feedback!.title);

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
    setTitle(editName);
    setEdit(false);
  };

  const handleDelete = () => {
    // links && setLinks(links.filter((item) => item.id !== link!.id));
  };

  return (
    <>
      {isOwner ? (
        <form
          className="flex w-full items-center"
          onSubmit={handleEditNameSubmit}
        >
          {edit ? (
            <input
              autoFocus
              className="flex-1 rounded-md px-1 py-2 text-[#000] outline-none"
              type="text"
              ref={inputRef}
              value={editName}
              onChange={handleEditNameChange}
            />
          ) : (
            <span className="font-bold">{feedback!.title || "Untitled"}</span>
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
          </div>
        </form>
      ) : (
        <span className="font-bold">{feedback!.title}</span>
      )}
    </>
  );
};

export default FeedbackTitle;
