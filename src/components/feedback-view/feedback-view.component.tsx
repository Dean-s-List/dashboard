import React, { useRef, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
// import Blocks from "editorjs-blocks-react-renderer";
import { UserContext } from "@/contexts/user.context";
import { updateRecord } from "@/tools/supabase";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import PlateEditor from "../editor/plate.component";
import type { MyValue } from "../editor/typescript/plateTypes";
import type { Feedbacks } from "@/types";
import { Json } from "@/types/supabase";

interface Props {
  feedback: Feedbacks;
  data: MyValue | Json | undefined;
  setValue: React.Dispatch<React.SetStateAction<MyValue | Json | undefined>>;
  isOwner: boolean;
  adminUI: boolean;
}

const FeedbackView: React.FC<Props> = ({
  feedback,
  data,
  setValue,
  isOwner,
  adminUI,
}) => {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<boolean>(false);
  //   const { editorData, setEditorData } = useContext(EditorContext);
  const { currentUser, isAdmin } = useContext(UserContext);
  const [editData, setEditData] = useState<MyValue | Json | undefined>(data);
  const [title, setTitle] = useState<string>("Untilted");

  const inputRef = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     if (data) {
  //       console.log("data from feedback view : ", data);
  //       setEditData(data);
  //       setLoading(false);
  //     }
  //   }, [data]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEditData(data);
    setEdit(true);
  };

  //   const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setEditData(e.target.value);
  //   };

  const handleEditNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editData) {
      toast.error("Editor is empty !");
    } else {
      toast
        .promise(
          (async () => {
            const db = "feedbacks";
            const data = await updateRecord(
              {
                id: feedback.id,
                user_id: currentUser!.id,
                title: feedback.title,
                project: feedback.project,
                published: true,
                category: feedback.category,
                content: editData,
                user_agent: feedback.user_agent,
                avatar_url: currentUser!.avatar_url,
                created_at: null,
              },
              db
            );
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating feedback..",
            success: () => {
              return <b>Feedback updated !</b>;
            },
            error: <b>Error updating feedback !</b>,
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
      {isAdmin || isOwner ? (
        <form
          className="flex h-full w-full flex-col items-center"
          onSubmit={handleEditNameSubmit}
        >
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

          <div className="h-full w-full bg-[#fff] text-[#000]">
            <PlateEditor
              value={data}
              setValue={setValue}
              feedback={feedback}
              currentUser={currentUser}
              isOwner={isOwner}
              adminUI={adminUI}
            />
          </div>
        </form>
      ) : (
        <article className="text-white mx-auto mt-8 flex w-[88%] flex-col items-center justify-center">
          <PlateEditor
            value={data}
            setValue={setValue}
            feedback={feedback}
            currentUser={currentUser}
            isOwner={isOwner}
            adminUI={adminUI}
          />
        </article>
      )}
    </>
  );
};

export default FeedbackView;
