import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Deliverables, Projects } from "@/types";
import { UserContext } from "@/contexts/user.context";
import { toast } from "react-hot-toast";
import { updateRecord } from "@/tools/supabase";

interface Props {
  deliverable: Deliverables;
  deliverables: Deliverables[];
  setDeliverables: React.Dispatch<React.SetStateAction<Deliverables[] | null>>;
}

const DeliverableTitle: React.FC<Props> = ({
  deliverable,
  deliverables,
  setDeliverables,
}) => {
  const { adminUI } = useContext(UserContext);
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
    if (!editName) {
      switch (!editName) {
        case !editName:
          toast.error("No name provided !");
          break;
        // case !editLink:
        //   toast.error("URL for link is empty !");
        //   break;
      }
    } else {
      toast
        .promise(
          (async () => {
            const db = "deliverables";
            const data = await updateRecord(
              {
                id: deliverable.id,
                due_date: deliverable.due_date,
                project: deliverable.project,
                name: editName,
                value: deliverable.value,
                category: deliverable.category,
                created_at: deliverable.created_at,
              },
              db
            );
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating link..",
            success: () => {
              // setLinks(
              //   links!.map((item) =>
              //     item.id === link!.id
              //       ? { ...item, text: editText, link: editLink }
              //       : item
              //   )
              // );
              return <b>Value deliverable !</b>;
            },
            error: <b>Error updating deliverable !</b>,
          }
        )
        .catch((error) => console.log(error));
    }

    // setDeliverables(
    //   deliverables.map((item) =>
    //     item.id === project.id ? { ...item, name: editName } : item
    //   )
    // );
    setEdit(false);
  };

  const handleDelete = () => {
    setDeliverables(deliverables.filter((item) => item.id !== deliverable.id));
  };

  return (
    <>
      {adminUI ? (
        <form
          className="flex w-full items-center justify-center"
          onSubmit={handleEditNameSubmit}
        >
          {edit ? (
            <input
              autoFocus
              className="w-[100%] flex-1 rounded-md px-1 text-[#000] outline-none"
              type="text"
              ref={inputRef}
              value={editName}
              onChange={handleEditNameChange}
            />
          ) : (
            <div
              className="text-md font-bold"
              onClick={() => setEdit(!edit)}
            >{`${deliverable.name}`}</div>
          )}
          <div className="flex items-center justify-center">
            <span
              className="ml-[10px] cursor-pointer text-[25px]"
              onClick={handleEdit}
            >
              {!edit ? (
                // <AiFillEdit />
                <></>
              ) : (
                <div className="flex">
                  <button type="submit">
                    <MdDone />
                  </button>
                  {/* <span
                    className="ml-[10px] cursor-pointer text-[25px]"
                    onClick={handleDelete}
                  >
                    <AiFillDelete />
                  </span> */}
                </div>
              )}
            </span>
          </div>
        </form>
      ) : (
        <div className="text-md w-full font-bold">{`${deliverable.name}`}</div>
      )}
    </>
  );
};

export default DeliverableTitle;
