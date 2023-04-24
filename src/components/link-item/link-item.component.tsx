import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Links, Projects } from "@/types";
import Link from "next/link";
import { UserContext } from "@/contexts/user.context";
import { toast } from "react-hot-toast";
import { updateLinks } from "@/tools/supabase";

interface Props {
  link: Links | null;
  links: Links[] | null;
  project: Projects;
  setLinks: React.Dispatch<React.SetStateAction<Links[] | null>>;
}

const LinkItem: React.FC<Props> = ({ link, links, setLinks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(link!.text);
  const [editLink, setEditLink] = useState<string>(link!.link);
  const { isAdmin } = useContext(UserContext);

  const inputTextRef = useRef<HTMLInputElement>(null);
  const inputLinkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTextRef.current?.focus();
  }, [edit]);
  useEffect(() => {
    inputLinkRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditLink(e.target.value);
  };

  const handleEditLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editText || !editLink) {
      switch (!editText || !editLink) {
        case !editText:
          toast.error("Text for link is empty !");
          break;
        case !editLink:
          toast.error("URL for link is empty !");
          break;
      }
    } else {
      toast
        .promise(
          (async () => {
            const data = await updateLinks({
              id: link!.id,
              project: link!.project,
              text: editText,
              link: editLink,
              created_at: null,
            });
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating link..",
            success: () => {
              setLinks(
                links!.map((item) =>
                  item.id === link!.id
                    ? { ...item, text: editText, link: editLink }
                    : item
                )
              );
              return <b>Link updated !</b>;
            },
            error: <b>Error updating link !</b>,
          }
        )
        .catch((error) => console.log(error));
    }

    setEdit(false);
  };

  const handleDelete = () => {
    setLinks(links!.filter((item) => item.id !== link!.id));
  };

  return (
    <>
      {isAdmin ? (
        <form
          className="flex w-full items-center"
          onSubmit={handleEditLinkSubmit}
        >
          {edit ? (
            <div className="flex flex-col">
              <input
                autoFocus
                className="flex-1 rounded-md px-1 text-[#000] outline-none"
                type="text"
                ref={inputTextRef}
                value={editText}
                onChange={handleEditTextChange}
              />
              <input
                autoFocus
                className="flex-1 rounded-md px-1 text-[#000] outline-none"
                type="text"
                ref={inputLinkRef}
                value={editLink}
                onChange={handleEditLinkChange}
              />
            </div>
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
