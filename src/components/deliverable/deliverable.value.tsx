import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Deliverables, Projects } from "@/types";
import { UserContext } from "@/contexts/user.context";
import { RadialProgress } from "../radial-progress/radial-progress.component";

interface Props {
  trackColor: string;
  indicatorColor: string;
  indicatorCap: string;
  labelColor: string;
  progress: number;
  spinnerMode: boolean;
  spinnerSpeed: number;
}

const DeliverableValue: React.FC<Props> = ({
  trackColor,
  indicatorColor,
  indicatorCap,
  labelColor,
  progress,
  spinnerMode,
  spinnerSpeed,
}) => {
  const { adminUI } = useContext(UserContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<number>(progress);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(parseInt(e.target.value));
  };

  const handleEditValueSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setDeliverables(
    //   deliverables.map((item) =>
    //     item.id === project.id ? { ...item, name: editName } : item
    //   )
    // );
    setEdit(false);
  };

  const handleDelete = () => {
    // setDeliverables(deliverables.filter((item) => item.id !== deliverable.id));
  };

  return (
    <>
      {adminUI ? (
        <form
          className="flex w-[50%] items-center justify-center"
          onSubmit={handleEditValueSubmit}
        >
          {edit ? (
            <input
              autoFocus
              className="w-[25%] flex-1 rounded-md px-1 text-[#000] outline-none"
              type="text"
              ref={inputRef}
              value={editValue}
              onChange={handleEditValueChange}
            />
          ) : (
            <div onClick={() => setEdit(!edit)}>
              <RadialProgress
                trackColor={trackColor}
                indicatorColor={indicatorColor}
                indicatorCap={indicatorCap || ""}
                labelColor={labelColor || ""}
                progress={progress}
                spinnerMode={false}
                spinnerSpeed={0}
              />
            </div>
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
                <button type="submit">
                  <MdDone />
                </button>
              )}
            </span>
          </div>
        </form>
      ) : (
        <RadialProgress
          trackColor={trackColor}
          indicatorColor={indicatorColor}
          indicatorCap={indicatorCap || ""}
          labelColor={labelColor || ""}
          progress={progress}
          spinnerMode={false}
          spinnerSpeed={0}
        />
      )}
    </>
  );
};

export default DeliverableValue;
