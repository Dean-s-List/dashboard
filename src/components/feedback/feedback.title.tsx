import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Feedbacks, Profiles, Projects } from "@/types";
import { updateRecord } from "@/tools/supabase";

interface Props {
  feedback: Feedbacks | null;
  project: Projects | null;
  currentUser: Profiles;
  isOwner: boolean;
  adminUI: boolean;
}

const FeedbackTitle: React.FC<Props> = ({
  feedback,
  project,
  currentUser,
  isOwner,
  adminUI,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string | null>(feedback!.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleEditTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTitle || !feedback || !project) {
      toast.error("Title is empty !");
    } else {
      toast
        .promise(
          (async () => {
            const db = "feedbacks";
            const data = await updateRecord(
              {
                id: feedback.id,
                user_id: currentUser.id,
                title: editTitle,
                project: project.id,
                created_at: feedback.created_at,
                published: true,
                category: feedback.category,
                content: feedback.content,
                user_agent: feedback.user_agent,
                avatar_url: feedback.avatar_url,
              },
              db
            );
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating feedback title..",
            success: () => {
              return <b>Feedback title updated !</b>;
            },
            error: <b>Error updating feedback title !</b>,
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
      {isOwner || adminUI ? (
        <form
          className="flex w-full items-center"
          onSubmit={handleEditTitleSubmit}
        >
          {edit ? (
            <input
              autoFocus
              className="flex-1 rounded-md px-1 py-2 text-[#000] outline-none"
              type="text"
              ref={inputRef}
              value={editTitle!}
              onChange={handleEditTitleChange}
            />
          ) : (
            <span className="font-bold">{feedback!.title || "Untitled"}</span>
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
        <span className="font-bold">{feedback!.title}</span>
      )}
    </>
  );
};

export default FeedbackTitle;
