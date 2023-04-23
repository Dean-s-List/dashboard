import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Links, Projects } from "@/types";
import Link from "next/link";
import { UserContext } from "@/contexts/user.context";

interface Props {
  link: Links | null;
  links: Links[] | null;
  project: Projects;
  setLinks: React.Dispatch<React.SetStateAction<Links[] | null>>;
}

const LinkItem: React.FC<Props> = ({ link, links, setLinks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(link!.text);
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
    links &&
      setLinks(
        links.map((item) =>
          item.id === link!.id ? { ...item, text: editName } : item
        )
      );
    setEdit(false);
  };

  const handleDelete = () => {
    links && setLinks(links.filter((item) => item.id !== link!.id));
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
              className="flex-1 rounded-md px-1 text-[#000] outline-none"
              type="text"
              ref={inputRef}
              value={editName}
              onChange={handleEditNameChange}
            />
          ) : (
            <Link href={link!.link}>
              <span className="text-sm font-bold text-secondary-dark">
                {link!.text}
              </span>
            </Link>
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
        <Link href={link!.link}>
          <span className="text-sm font-bold text-secondary-dark">
            {link!.text}
          </span>
        </Link>
      )}
    </>
  );
};

export default LinkItem;
