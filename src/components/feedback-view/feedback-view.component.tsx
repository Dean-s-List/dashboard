import dynamic from "next/dynamic";
import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  SetStateAction,
} from "react";
import { toast } from "react-hot-toast";
import Blocks from "editorjs-blocks-react-renderer";
import { UserContext } from "@/contexts/user.context";
import { EditorContext } from "@/contexts/editor.context";
import { updateFeedback } from "@/tools/supabase";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { OutputData } from "@editorjs/editorjs";
import type { Feedbacks } from "@/types";

interface Props {
  feedback: Feedbacks;
  data: OutputData | null;
  isOwner: boolean;
}

const EditorBlock = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const FeedbackView: React.FC<Props> = ({ feedback, data, isOwner }) => {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<boolean>(false);
  //   const { editorData, setEditorData } = useContext(EditorContext);
  const { currentUser, isAdmin } = useContext(UserContext);
  const [editData, setEditData] = useState<OutputData>();

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
    setEditData(data!);
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
            const data = await updateFeedback({
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
            });
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
          {edit && data && currentUser ? (
            <div className="h-full w-full bg-[#fff] text-[#000]">
              <EditorBlock
                data={data}
                onChange={setEditData}
                holder="editorjs-container"
              />
            </div>
          ) : (
            <article className="text-white mx-auto mt-8 flex w-[88%] flex-col items-center justify-center">
              <Blocks
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data={JSON.parse(feedback.content as string)}
                config={{
                  paragraph: {
                    className:
                      "text-base text-opacity-75 h-[50%] max-h-[50%] mb-4",
                    actionsClassNames: {
                      alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                    },
                  },
                }}
              />
            </article>
          )}
        </form>
      ) : (
        <article className="text-white mx-auto mt-8 flex w-[88%] flex-col items-center justify-center">
          <Blocks
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data={JSON.parse(feedback.content as string)}
            config={{
              paragraph: {
                className: "text-base text-opacity-75 h-[50%] max-h-[50%] mb-4",
                actionsClassNames: {
                  alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                },
              },
            }}
          />
        </article>
      )}
    </>
  );
};

export default FeedbackView;
